import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import crypto from 'crypto';
import { WebSocketServer } from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.NODE_ENV === 'production' ? 3000 : 3001;

// Simple session management
const sessions = new Map(); // sessionId -> { createdAt, expiresAt }
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Admin credentials (should be in env variables in production)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Change this!

// Enable CORS for Vite dev server
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Serve uploaded assets FIRST (user content takes priority)
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// In production, serve the built frontend apps
if (process.env.NODE_ENV === 'production') {
  // Serve main portal static files (JS, CSS, etc from build)
  // This will serve /assets/* from portal build ONLY if not found in public/assets above
  app.use(express.static(path.join(__dirname, 'public/portal')));
  
  // Serve admin dashboard static files
  app.use('/admin', express.static(path.join(__dirname, 'public/admin')));
}

// Auth middleware
function requireAuth(req, res, next) {
  const sessionId = req.headers['x-session-id'];
  
  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const session = sessions.get(sessionId);
  if (Date.now() > session.expiresAt) {
    sessions.delete(sessionId);
    return res.status(401).json({ error: 'Session expired' });
  }
  
  next();
}

// Configure multer for file uploads with dynamic destination
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // Get folder from query parameter instead of body (body not parsed yet in multer)
      const folder = req.query.folder || 'uploads';
      const uploadPath = path.join(__dirname, 'public/assets', folder);
      
      // Create directory if it doesn't exist
      fs.mkdirSync(uploadPath, { recursive: true});
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      // Keep original filename
      cb(null, file.originalname);
    }
  }),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// File upload endpoint (protected)
app.post('/api/upload', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const folder = req.query.folder || 'uploads';
  const fileUrl = `/assets/${folder}/${req.file.filename}`;
  
  res.json({ 
    success: true, 
    url: fileUrl,
    filename: req.file.filename
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  
  // Create session
  const sessionId = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  sessions.set(sessionId, {
    createdAt: now,
    expiresAt: now + SESSION_DURATION
  });
  
  res.json({ 
    success: true,
    sessionId,
    expiresAt: now + SESSION_DURATION
  });
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  const sessionId = req.headers['x-session-id'];
  if (sessionId) {
    sessions.delete(sessionId);
  }
  res.json({ success: true });
});

// Check session endpoint
app.get('/api/check-session', (req, res) => {
  const sessionId = req.headers['x-session-id'];
  
  if (!sessionId || !sessions.has(sessionId)) {
    return res.json({ authenticated: false });
  }
  
  const session = sessions.get(sessionId);
  if (Date.now() > session.expiresAt) {
    sessions.delete(sessionId);
    return res.json({ authenticated: false });
  }
  
  res.json({ authenticated: true, expiresAt: session.expiresAt });
});

// Save portal content endpoint (now protected)
app.post('/api/save-content', requireAuth, (req, res) => {
  const contentPath = path.join(__dirname, 'src/data/portalContent.json');
  
  try {
    fs.writeFileSync(contentPath, JSON.stringify(req.body, null, 2));
    
    // Broadcast to all WebSocket clients that content has changed
    // Include the session ID so the sender can ignore their own update
    const sessionId = req.headers['x-session-id'];
    broadcastContentUpdate(sessionId);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save content' });
  }
});

// Get portal content endpoint
app.get('/api/content', (req, res) => {
  console.log('📥 /api/content requested');
  const contentPath = path.join(__dirname, 'src/data/portalContent.json');
  
  try {
    if (!fs.existsSync(contentPath)) {
      console.log('⚠️  Content file not found, returning empty content');
      // Return default empty content structure
      return res.json({
        heroVideos: [],
        heroBanners: [],
        blockSets: [],
        chips: [],
        footer: { links: [] },
        editorsPicks: [],
        quickFun: [],
        discovery: { strips: [] },
        sections: []
      });
    }
    
    const content = fs.readFileSync(contentPath, 'utf8');
    console.log('✅ Content loaded successfully');
    res.json(JSON.parse(content));
  } catch (error) {
    console.error('❌ Failed to load content:', error.message);
    res.status(500).json({ error: 'Failed to load content', details: error.message });
  }
});

// Utility: Weather proxy (Open-Meteo, no API key required)
app.get('/api/utility/weather', async (req, res) => {
  try {
    const lat = req.query.lat || '43.8563';
    const lon = req.query.lon || '18.4131';
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&current=temperature_2m,weather_code&timezone=Europe%2FSarajevo`;
    const r = await fetch(url);
    if (!r.ok) return res.status(502).json({ error: 'Weather upstream failed' });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Weather fetch failed' });
  }
});

// Utility: Currency rates proxy
// Primary: exchangerate-api.com (requires API key, fast and reliable)
// Fallback: open.er-api.com (no key) and cross-rate via EUR if needed
app.get('/api/utility/rates', async (req, res) => {
  try {
    const base = (req.query.base || 'EUR').toString().toUpperCase();
    const symbolsStr = (req.query.symbols || 'BAM,USD').toString().toUpperCase();
    const symbols = symbolsStr.split(',').map(s => s.trim()).filter(Boolean);

    const KEY = process.env.EXCHANGE_RATE_API_KEY;

    // 1) Try exchangerate-api.com if API key present
    if (KEY) {
      const url = `https://v6.exchangerate-api.com/v6/${encodeURIComponent(KEY)}/latest/${encodeURIComponent(base)}`;
      const r = await fetch(url);
      if (r.ok) {
        const data = await r.json();
        if (data && data.conversion_rates) {
          const out = {};
          for (const s of symbols) {
            if (s in data.conversion_rates) out[s] = data.conversion_rates[s];
          }
          return res.json({ base, rates: out });
        }
      }
      // If call failed, fall through to the free provider
    }

    // 2) Free provider: open.er-api.com
    const r2 = await fetch(`https://open.er-api.com/v6/latest/${encodeURIComponent(base)}`);
    if (r2.ok) {
      const data2 = await r2.json();
      if (data2 && data2.result === 'success' && data2.rates) {
        const out = {};
        for (const s of symbols) {
          if (s in data2.rates) out[s] = data2.rates[s];
        }
        // If we got at least one symbol, return; otherwise try cross-rate
        if (Object.keys(out).length > 0) return res.json({ base, rates: out });
      }
    }

    // 3) Cross-rate via EUR as last resort
    const rf = await fetch(`https://open.er-api.com/v6/latest/EUR`);
    if (!rf.ok) return res.status(502).json({ error: 'Rates upstream failed' });
    const ref = await rf.json();
    if (!(ref && ref.result === 'success' && ref.rates)) {
      return res.status(502).json({ error: 'Rates upstream failed' });
    }
    const baseRate = ref.rates[base];
    if (!baseRate) return res.status(502).json({ error: 'Base currency not available' });
    const cross = {};
    for (const s of symbols) {
      const sr = ref.rates[s];
      if (sr) cross[s] = sr / baseRate;
    }
    return res.json({ base, rates: cross });
  } catch (e) {
    res.status(500).json({ error: 'Rates fetch failed' });
  }
});

// SPA fallback - serve index.html for non-API routes in production
// This MUST come after all API routes
if (process.env.NODE_ENV === 'production') {
  // Admin SPA fallback
  app.get(/^\/admin(?:\/.*)?$/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin/index.html'));
  });
  
  // Portal SPA fallback (catch all remaining non-API/asset routes)
  app.get(/^(?!\/api|\/assets).*$/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/portal/index.html'));
  });
}

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ Server Running!`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`📍 Local:   http://localhost:${PORT}`);
  console.log(`� Network: http://<YOUR_IP>:${PORT}`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`🌐 Portal: /`);
    console.log(`👨‍💼 Admin: /admin`);
    // Debug: Check if built files exist
    const portalIndex = path.join(__dirname, 'public/portal/index.html');
    const adminIndex = path.join(__dirname, 'public/admin/index.html');
    console.log(`📄 Portal index exists: ${fs.existsSync(portalIndex)}`);
    console.log(`📄 Admin index exists: ${fs.existsSync(adminIndex)}`);
    if (fs.existsSync(path.join(__dirname, 'public/portal'))) {
      console.log(`📂 Portal files:`, fs.readdirSync(path.join(__dirname, 'public/portal')));
    }
  }
  console.log(`📁 Files saved to: public/assets/`);
  console.log(`💾 Content saved to: src/data/portalContent.json`);
  console.log(`🔌 WebSocket ready for live updates\n`);
});

const wss = new WebSocketServer({ server });

// Track connected WebSocket clients with their session IDs
wss.on('connection', (ws) => {
  console.log('🔌 New WebSocket client connected');
  
  // Store session ID when client sends it
  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString());
      if (msg.type === 'auth') {
        ws.sessionId = msg.sessionId;
        console.log(`🔑 WebSocket authenticated with session: ${msg.sessionId?.substring(0, 8)}...`);
      }
    } catch (e) {
      // Ignore parse errors
    }
  });
  
  ws.on('error', console.error);
  
  ws.on('close', () => {
    console.log('🔌 WebSocket client disconnected');
  });
});

// Broadcast content update to all connected clients except the sender
function broadcastContentUpdate(senderSessionId) {
  const message = JSON.stringify({ 
    type: 'content-updated', 
    timestamp: Date.now(),
    senderSessionId // Include so clients can ignore their own updates
  });
  
  let broadcastCount = 0;
  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // WebSocket.OPEN
      // Don't send to the client who made the change
      if (client.sessionId !== senderSessionId) {
        client.send(message);
        broadcastCount++;
      }
    }
  });
  
  console.log(`📡 Broadcast content update to ${broadcastCount} client(s) (excluding sender)`);
}
