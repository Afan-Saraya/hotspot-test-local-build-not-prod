# Architecture Overview

## Multi-App Setup

This project runs **THREE separate servers**:

### 1. Main Portal (Port 3000)
- **URL**: http://localhost:3000
- **Purpose**: Public-facing captive portal
- **Tech**: React + Vite
- **Features**: Hero banners, blocks, chips, footer

### 2. Admin Dashboard (Port 5173)
- **URL**: http://localhost:5173
- **Purpose**: Content management interface
- **Tech**: React + Vite (separate app)
- **Features**: Full CMS with working modals, color pickers, file uploads
- **Location**: `Admin Dashboard with Tabs/` folder

### 3. Backend API (Port 3001)
- **URL**: http://localhost:3001
- **Purpose**: Shared data persistence and file uploads
- **Tech**: Express.js + Multer
- **Features**: REST API, file storage

## Running the Project

### Start All Servers
```bash
npm run dev
```

This starts all three servers simultaneously using `concurrently`.

### Start Individually
```bash
npm run frontend  # Portal only (port 3000)
npm run server    # Backend only (port 3001)
npm run admin     # Admin only (port 5173)
```

## Data Flow

```
Admin Dashboard (5173)
    ↓ POST /api/save-content
Backend API (3001)
    ↓ writes to
portalContent.json
    ↑ reads from
    ↓ GET /api/content
Main Portal (3000)
```

## Why Separate Apps?

The Admin Dashboard is kept separate because:
- ✅ **Working Radix UI modals** - No conflicts with main portal CSS
- ✅ **Independent development** - Can update admin without affecting portal
- ✅ **Clean separation** - Different UI libraries, build configs, dependencies
- ✅ **Easier debugging** - Isolated component trees

## Shared Resources

- **Backend API** (server.js) - Both apps use the same Express server
- **portalContent.json** - Single source of truth for all content
- **public/assets/** - Uploaded files accessible by both apps
