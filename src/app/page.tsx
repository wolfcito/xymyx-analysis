import StateLoader from '@/components/StateLoader';
import Image from 'next/image';
import TitleHeader from '@/components/sections/TitleHeader';
import LeftPanel from '@/components/sections/LeftPanel';
import CenterSection from '@/components/sections/CenterSection';
import RightPanel from '@/components/sections/RightPanel';
import BottomDock from '@/components/sections/BottomDock';

export const metadata = {
  title: 'XYMYX Analyzer - Streaming Overlay',
  description: 'Analizador avanzado de ajedrez con interfaz de streaming overlay moderna',
};

export default function HomePage() {
  return (
    <div className="streaming-overlay h-screen flex flex-col">
      <StateLoader />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Small screens gate */}
        <div className="sm:hidden flex-1 flex items-center justify-center p-6 text-center">
          <div className="max-w-sm text-white/90">
            <div className="text-xl font-semibold mb-2">Disponible solo en Web y Tablets</div>
            <div className="text-sm text-white/70">
              Para la mejor experiencia, usa este sitio en un navegador de escritorio o tablet.
            </div>
          </div>
        </div>

        {/* Main layout for web and tablets - Scene Frame Layout */}
        <div className="hidden sm:block flex-1 overflow-hidden relative">
          {/* Main Frame Border */}
          <div className="absolute inset-0 pointer-events-none z-50">
            <Image src="/scene/001_marco.png" alt="Frame border" fill className="object-cover" />
          </div>

          {/* Content inside the frame */}
          <div className="absolute inset-8 flex flex-col">
            {/* Title Header - Full Width */}
            <TitleHeader />

            {/* Main Content - Three panels */}
            <div className="flex-1 flex gap-4 mt-4">
              <LeftPanel />
              <CenterSection />
              <RightPanel />
            </div>

            {/* Bottom Dock - Optional */}
            <BottomDock visible={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
