import Board from '@/components/Board';
import AnnotationLayer from '@/components/AnnotationLayer';
import PieceTray from '@/components/PieceTray';
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
        <div className="flex-1 flex flex-col p-4 lg:p-6">
          <div className="main-content-frame flex-1 flex flex-col p-4 lg:p-6">
            {/* Chess Board */}
            <div className="flex-1 flex items-center justify-center min-h-0">
              <div className="relative w-full h-full max-w-4xl max-h-4xl aspect-square">
                <Board />
                <div className="absolute inset-0 pointer-events-none">
                  <AnnotationLayer />
                </div>
              </div>
            </div>

            {/* Piece Tray */}
            <div className="mt-4 flex-shrink-0">
              <PieceTray />
            </div>
          </div>
        </div>

        {/* Right Side - Sidebar */}
        <div className="w-72 lg:w-80 flex-shrink-0 p-4 lg:p-6">
          <StreamingSidebar />
        </div>
      </div>
    </div>
  );
}
