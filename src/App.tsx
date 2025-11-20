import React from 'react';
import { CaptivePortalContent } from './components/CaptivePortalContent'
import { PortalContentProvider } from './context/PortalContentContext';

export default function App() {
  const [dimensions, setDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  React.useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen w-full">
      <div className="bg-[#0E0F13] min-h-screen w-full">
        <React.Suspense fallback={<div className="text-white p-8">Loading portal...</div>}>
          <PortalContentProvider>
            <CaptivePortalContent
              width={dimensions.width}
              height={dimensions.height}
              deviceName="Responsive"
            />
          </PortalContentProvider>
        </React.Suspense>
      </div>
    </div>
  );
}