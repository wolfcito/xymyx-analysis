import Board from '@/components/Board';
import AnnotationLayer from '@/components/AnnotationLayer';
import StreamingHeader from '@/components/StreamingHeader';
import StreamingSidebar from '@/components/StreamingSidebar';
import StateLoader from '@/components/StateLoader';

export const metadata = {
  title: 'XYMYX Analyzer - Streaming Overlay',
  description: 'Analizador avanzado de ajedrez con interfaz de streaming overlay moderna',
};

export default function HomePage() {
  return (
    <div className="streaming-overlay h-screen flex flex-col">
      <StateLoader />

      {/* Header */}
      <StreamingHeader />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Main Chess Board */}
        <div className="flex-1 flex flex-col">
          <div className="main-content-frame flex-1 flex flex-col board-background">
            {/* Chess Board */}
            <div className="flex-1 flex items-center justify-center min-h-0 p-6 board-container">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative aspect-square w-full h-full max-w-[min(100%,60vh)] max-h-[min(100%,60vh)]">
                  <Board />
                  <div className="absolute inset-0 pointer-events-none">
                    <AnnotationLayer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sidebar */}
        <div className="w-72 lg:w-80 flex-shrink-0">
          <StreamingSidebar />
        </div>
      </div>
    </div>
  );
}
