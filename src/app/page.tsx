import Board from '@/components/Board';
import AnnotationLayer from '@/components/AnnotationLayer';
import PieceTray from '@/components/PieceTray';
import Toolbar from '@/components/Toolbar';
import StreamingHeader from '@/components/StreamingHeader';
import StreamingSidebar from '@/components/StreamingSidebar';
import StreamingFooter from '@/components/StreamingFooter';
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
        <div className="flex-1 flex flex-col p-6">
          <div className="main-content-frame flex-1 flex flex-col p-6">
            {/* Toolbar */}
            <div className="mb-4">
              <Toolbar />
            </div>

            {/* Chess Board */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-full max-w-2xl aspect-square">
                <Board />
                <div className="absolute inset-0 pointer-events-none">
                  <AnnotationLayer />
                </div>
              </div>
            </div>

            {/* Piece Tray */}
            <div className="mt-4">
              <PieceTray />
            </div>
          </div>
        </div>

        {/* Right Side - Sidebar */}
        <div className="w-80 flex-shrink-0 p-6">
          <StreamingSidebar />
        </div>
      </div>

      {/* Footer */}
      <StreamingFooter />
    </div>
  );
}
