import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { GlobalSettings } from "./components/GlobalSettings";
import { HeroVideoTab, HeroVideo } from "./components/HeroVideoTab";
import { ChipsTab, Chip } from "./components/ChipsTab";
import { HeroBannerTab, HeroBanner } from "./components/HeroBannerTab";
import { BlocksTab, BlockSet } from "./components/BlocksTab";
import { FooterTab, FooterIcon, FooterStyling } from "./components/FooterTab";
import { EditorsPicksTab, EditorsPickItem } from "./components/EditorsPicksTab";
import { DiscoveryTab, DiscoveryPlaceItem } from "./components/DiscoveryTab";
import { QuickFunTab, QuickFunItem } from "./components/QuickFunTab";
import { UtilitiesTab, UtilitiesConfig } from "./components/UtilitiesTab";
import { SectionsTab, SectionsConfig } from "./components/SectionsTab";
import { LoginPage } from "./components/LoginPage";
import { Save, LogOut } from "lucide-react";
import { Button } from "./components/ui/button";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  // Authentication state
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  // Track initial state and modifications
  const [initialContentHash, setInitialContentHash] = useState<string>("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastServerUpdate, setLastServerUpdate] = useState<number>(0);
  
  // Global Settings
  const [backgroundColor, setBackgroundColor] = useState("rgba(255, 255, 255, 1)");
  const [primaryColor, setPrimaryColor] = useState("rgba(0, 123, 255, 1)");
  const [secondaryColor, setSecondaryColor] = useState("rgba(108, 117, 125, 1)");

  // Hero Videos
  const [heroVideos, setHeroVideos] = useState<HeroVideo[]>([]);

  // Chips
  const [chips, setChips] = useState<Chip[]>([]);

  // Hero Banners
  const [heroBanners, setHeroBanners] = useState<HeroBanner[]>([]);

  // Block Sets
  const [blockSets, setBlockSets] = useState<BlockSet[]>([]);

  // Footer
  const [footerIcons, setFooterIcons] = useState<FooterIcon[]>([]);
  const [footerStyling, setFooterStyling] = useState<FooterStyling>({
    footerBackground: "rgba(33, 37, 41, 1)",
    iconColor: "rgba(255, 255, 255, 1)",
    textColor: "rgba(255, 255, 255, 1)"
  });

  // New sections
  const [editorsPicks, setEditorsPicks] = useState<EditorsPickItem[]>([]);
  const [discoveryPlaces, setDiscoveryPlaces] = useState<DiscoveryPlaceItem[]>([]);
  const [quickFun, setQuickFun] = useState<QuickFunItem | null>(null);
  const [utilities, setUtilities] = useState<UtilitiesConfig>({
    city: "Sarajevo",
    lat: 43.8563,
    lon: 18.4131,
    baseCurrency: "EUR",
    targetCurrencies: ["BAM", "USD"],
  });
  const [sections, setSections] = useState<SectionsConfig>({});

  // Check authentication on mount
  useEffect(() => {
    const storedSession = localStorage.getItem("sessionId");
    if (!storedSession) {
      setCheckingAuth(false);
      return;
    }

    // Verify session with server
    fetch("/api/check-session", {
      headers: {
        "x-session-id": storedSession,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setSessionId(storedSession);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("sessionId");
        }
      })
      .catch(() => {
        localStorage.removeItem("sessionId");
      })
      .finally(() => {
        setCheckingAuth(false);
      });
  }, []);

  const handleLogin = (newSessionId: string) => {
    setSessionId(newSessionId);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    if (sessionId) {
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          "x-session-id": sessionId,
        },
      });
    }
    localStorage.removeItem("sessionId");
    setSessionId(null);
    setIsAuthenticated(false);
  };

    // Load data from server on mount
  useEffect(() => {
    if (!isAuthenticated) return; // Don't load content until authenticated
    
    const loadContent = () => {
      const buildApiUrl = () => {
        if (window.location.port === '5173') {
          return '/api/content';
        }
        return '/api/content';
      };

      const url = buildApiUrl();

      fetch(url, { cache: 'no-cache' }) // Force fresh data
        .then((res) => res.json())
        .then((data) => {
          // Store the server's last update timestamp
          if (data._lastModified) {
            setLastServerUpdate(data._lastModified);
          }
          
          if (data.global) {
            setBackgroundColor(data.global.backgroundColor || "rgba(255, 255, 255, 1)");
            setPrimaryColor(data.global.primaryColor || "rgba(0, 123, 255, 1)");
            setSecondaryColor(data.global.secondaryColor || "rgba(108, 117, 125, 1)");
          }
          if (data.heroVideos) setHeroVideos(data.heroVideos);
          if (data.chips) setChips(data.chips);
          if (data.heroBanners) setHeroBanners(data.heroBanners);
          if (data.blockSets) setBlockSets(data.blockSets);
          if (data.footer) {
            setFooterIcons(data.footer.icons || []);
            setFooterStyling(data.footer.styling || {
              footerBackground: "rgba(33, 37, 41, 1)",
              iconColor: "rgba(255, 255, 255, 1)",
              textColor: "rgba(255, 255, 255, 1)"
            });
          }
          if (data.editorsPicks) setEditorsPicks(data.editorsPicks);
          if (data.discovery && Array.isArray(data.discovery.places)) setDiscoveryPlaces(data.discovery.places);
          if (data.quickFun) setQuickFun(data.quickFun);
          if (data.utilities) setUtilities(data.utilities);
          if (data.sections) setSections(data.sections);
          
          // Create a hash of the initial state - use same structure as change detection
          const initialData = {
            global: {
              backgroundColor: data.global?.backgroundColor || "rgba(255, 255, 255, 1)",
              primaryColor: data.global?.primaryColor || "rgba(0, 123, 255, 1)",
              secondaryColor: data.global?.secondaryColor || "rgba(108, 117, 125, 1)"
            },
            heroVideos: data.heroVideos || [],
            chips: data.chips || [],
            heroBanners: data.heroBanners || [],
            blockSets: data.blockSets || [],
            footer: {
              icons: data.footer?.icons || [],
              styling: data.footer?.styling || {
                footerBackground: "rgba(33, 37, 41, 1)",
                iconColor: "rgba(255, 255, 255, 1)",
                textColor: "rgba(255, 255, 255, 1)"
              }
            },
            editorsPicks: data.editorsPicks || [],
            discovery: { places: data.discovery?.places || [] },
            quickFun: data.quickFun || null,
            utilities: data.utilities || {
              city: "Sarajevo",
              lat: 43.8563,
              lon: 18.4131,
              baseCurrency: "EUR",
              targetCurrencies: ["BAM", "USD"],
            },
            sections: data.sections || {},
          };
          const contentHash = JSON.stringify(initialData);
          setInitialContentHash(contentHash);
          setHasUnsavedChanges(false);
        })
        .catch((error) => {
          console.error("Failed to load content:", error);
          toast.error("Failed to load content from server");
        });
    };

    loadContent();
    
    // WebSocket connection for real-time updates (only depends on auth, not state changes)
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const ws = new WebSocket(`${protocol}//${host}`);
    
    ws.onopen = () => {
      console.log('🔌 WebSocket connected - live updates enabled');
      
      // Send session ID for authentication
      if (sessionId) {
        ws.send(JSON.stringify({ type: 'auth', sessionId }));
      }
      
      toast.success("Live updates enabled", { duration: 2000 });
    };
    
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'content-updated') {
          console.log('📡 Content updated by another user');
          
          // Check if user has unsaved changes - use a ref to get current state
          const currentUnsavedState = document.querySelector('[data-has-unsaved]')?.getAttribute('data-has-unsaved') === 'true';
          
          if (currentUnsavedState) {
            // Don't auto-reload if user is actively editing
            toast.warning("Another user saved changes!", {
              description: "You have unsaved work. Your changes won't be overwritten, but click Save soon to avoid conflicts.",
              duration: 10000,
              action: {
                label: "Reload anyway",
                onClick: () => {
                  if (confirm("This will discard your unsaved changes. Continue?")) {
                    loadContent();
                  }
                }
              }
            });
          } else {
            // Auto-reload if no unsaved changes
            setTimeout(() => {
              toast.info("Content updated - reloading...", { duration: 2000 });
              loadContent();
            }, 500);
          }
        }
      } catch (e) {
        console.error('Failed to parse WebSocket message:', e);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      console.log('🔌 WebSocket disconnected');
    };
    
    return () => {
      ws.close();
    };
  }, [isAuthenticated]); // ONLY reconnect on auth change, not on every state update

  // Detect changes to track unsaved modifications
  useEffect(() => {
    if (!initialContentHash) return; // Skip until initial load complete
    
    const currentData = {
      global: { backgroundColor, primaryColor, secondaryColor },
      heroVideos,
      chips,
      heroBanners,
      blockSets,
      footer: { icons: footerIcons, styling: footerStyling },
      editorsPicks,
      discovery: { places: discoveryPlaces },
      quickFun,
      utilities,
      sections,
    };
    
    const currentHash = JSON.stringify(currentData);
    const changed = currentHash !== initialContentHash;
    console.log('🔍 Change detection:', { changed, hasUnsavedChanges });
    setHasUnsavedChanges(changed);
  }, [
    backgroundColor, primaryColor, secondaryColor,
    heroVideos, chips, heroBanners, blockSets,
    footerIcons, footerStyling,
    editorsPicks, discoveryPlaces, quickFun, utilities, sections,
    initialContentHash
  ]);

  const handleSave = async () => {
    // Don't save if no changes were made
    if (!hasUnsavedChanges) {
      toast.info("No changes to save");
      return;
    }

    // Check for conflicts before saving
    try {
      const checkRes = await fetch('/api/content', { cache: 'no-cache' });
      const serverData = await checkRes.json();
      
      if (serverData._lastModified && serverData._lastModified > lastServerUpdate) {
        // Detect specific conflicts
        const conflicts: string[] = [];
        
        // Check each section for differences
        if (JSON.stringify(serverData.heroVideos) !== JSON.stringify(heroVideos)) {
          conflicts.push(`• Hero Videos (${serverData.heroVideos?.length || 0} on server vs ${heroVideos.length} in your editor)`);
        }
        if (JSON.stringify(serverData.heroBanners) !== JSON.stringify(heroBanners)) {
          conflicts.push(`• Hero Banners (${serverData.heroBanners?.length || 0} on server vs ${heroBanners.length} in your editor)`);
        }
        if (JSON.stringify(serverData.chips) !== JSON.stringify(chips)) {
          conflicts.push(`• Chips (${serverData.chips?.length || 0} on server vs ${chips.length} in your editor)`);
        }
        if (JSON.stringify(serverData.blockSets) !== JSON.stringify(blockSets)) {
          conflicts.push(`• Block Sets (${serverData.blockSets?.length || 0} on server vs ${blockSets.length} in your editor)`);
        }
        if (JSON.stringify(serverData.editorsPicks) !== JSON.stringify(editorsPicks)) {
          conflicts.push(`• Editor's Picks (${serverData.editorsPicks?.length || 0} on server vs ${editorsPicks.length} in your editor)`);
        }
        if (JSON.stringify(serverData.footer) !== JSON.stringify({ icons: footerIcons, styling: footerStyling })) {
          conflicts.push(`• Footer`);
        }
        
        const conflictMessage = conflicts.length > 0
          ? `The following sections have conflicts:\n${conflicts.join('\n')}\n\n`
          : '';
        
        const confirmed = window.confirm(
          "⚠️ CONFLICT DETECTED\n\n" +
          "Another user has made changes since you loaded this page.\n\n" +
          conflictMessage +
          "If you save now:\n" +
          "✓ Your changes will be saved\n" +
          "✗ Their changes will be LOST\n\n" +
          "Click OK to overwrite their changes, or Cancel to refresh and merge manually."
        );
        
        if (!confirmed) {
          toast.info("Save cancelled. Refreshing to load latest content...");
          setTimeout(() => window.location.reload(), 500);
          return;
        }
      }
    } catch (err) {
      console.error("Failed to check for conflicts:", err);
      // Continue with save even if check fails
    }

    const data = {
      global: {
        backgroundColor,
        primaryColor,
        secondaryColor
      },
      heroVideos,
      chips,
      heroBanners,
      blockSets,
      footer: {
        icons: footerIcons,
        styling: footerStyling
      },
      // New sections
      editorsPicks,
      discovery: { places: discoveryPlaces },
      quickFun,
      utilities,
      sections,
      _lastModified: Date.now(), // Add timestamp
    };

    try {
      // Relative path for same-origin/proxied requests
      const response = await fetch("/api/save-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": sessionId || "",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        toast.error("Session expired. Please log in again.");
        handleLogout();
        return;
      }

      if (response.ok) {
        toast.success("Configuration saved successfully!");
        
        // Update tracking state - use same structure as change detection (without _lastModified)
        const savedStateForHash = {
          global: { backgroundColor, primaryColor, secondaryColor },
          heroVideos,
          chips,
          heroBanners,
          blockSets,
          footer: { icons: footerIcons, styling: footerStyling },
          editorsPicks,
          discovery: { places: discoveryPlaces },
          quickFun,
          utilities,
          sections,
        };
        
        setInitialContentHash(JSON.stringify(savedStateForHash));
        setLastServerUpdate(data._lastModified);
        setHasUnsavedChanges(false);
      } else {
        toast.error("Failed to save configuration");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save configuration");
    }
  };

  // Show loading state while checking auth
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Toaster />
        <LoginPage onLogin={handleLogin} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" data-has-unsaved={hasUnsavedChanges}>
      <Toaster />
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1>Captive Portal Admin</h1>
              <p className="text-sm text-gray-500">
                Manage your advertising platform content
                {hasUnsavedChanges && <span className="ml-2 text-orange-600 font-medium">• Unsaved changes</span>}
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleLogout} 
                variant="outline"
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
              <Button 
                onClick={handleSave} 
                className="gap-2"
                variant={hasUnsavedChanges ? "default" : "secondary"}
                disabled={!hasUnsavedChanges}
              >
                <Save className="w-4 h-4" />
                Save Changes
                {hasUnsavedChanges && <span className="ml-1 text-xs">(•)</span>}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="global" className="w-full">
          <TabsList className="flex w-full flex-wrap gap-2 mb-8 py-1">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="hero-video">Hero Video</TabsTrigger>
            <TabsTrigger value="chips">Chips</TabsTrigger>
            <TabsTrigger value="hero-banner">Hero Banner</TabsTrigger>
            <TabsTrigger value="blocks">Blocks</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
            <TabsTrigger value="editors-picks">Editors Picks</TabsTrigger>
            <TabsTrigger value="discovery">Discovery</TabsTrigger>
            <TabsTrigger value="quick-fun">Quick Fun</TabsTrigger>
            <TabsTrigger value="utilities">Utilities</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
          </TabsList>

          <TabsContent value="global">
            <GlobalSettings
              backgroundColor={backgroundColor}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              onBackgroundColorChange={setBackgroundColor}
              onPrimaryColorChange={setPrimaryColor}
              onSecondaryColorChange={setSecondaryColor}
            />
          </TabsContent>

          <TabsContent value="hero-video">
            <HeroVideoTab
              videos={heroVideos}
              onVideosChange={setHeroVideos}
            />
          </TabsContent>

          <TabsContent value="chips">
            <ChipsTab
              chips={chips}
              onChipsChange={setChips}
            />
          </TabsContent>

          <TabsContent value="hero-banner">
            <HeroBannerTab
              banners={heroBanners}
              onBannersChange={setHeroBanners}
            />
          </TabsContent>

          <TabsContent value="blocks">
            <BlocksTab
              blockSets={blockSets}
              onBlockSetsChange={setBlockSets}
            />
          </TabsContent>

          <TabsContent value="footer">
            <FooterTab
              icons={footerIcons}
              styling={footerStyling}
              onIconsChange={setFooterIcons}
              onStylingChange={setFooterStyling}
            />
          </TabsContent>

          <TabsContent value="editors-picks">
            <EditorsPicksTab items={editorsPicks} onChange={setEditorsPicks} />
          </TabsContent>

          <TabsContent value="discovery">
            <DiscoveryTab places={discoveryPlaces} onChange={setDiscoveryPlaces} />
          </TabsContent>

          <TabsContent value="quick-fun">
            <QuickFunTab item={quickFun} onChange={setQuickFun} />
          </TabsContent>

          <TabsContent value="utilities">
            <UtilitiesTab value={utilities} onChange={setUtilities} />
          </TabsContent>

          <TabsContent value="sections">
            <SectionsTab value={sections} onChange={setSections} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
