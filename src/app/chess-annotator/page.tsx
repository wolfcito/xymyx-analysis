import Board from '@/components/Board';
import AnnotationLayer from '@/components/AnnotationLayer';
import PieceTray from '@/components/PieceTray';
import Toolbar from '@/components/Toolbar';
import MoveList from '@/components/MoveList';
import StateLoader from '@/components/StateLoader';

export const metadata = {
  title: 'Chess Annotator',
};

function ChessAnnotatorPage() {
  const metricsPanel = () => (
    <aside aria-label="metrics" className="text-xs">
      metrics
    </aside>
  );

  return (
    <main className="p-4 sm:p-6 grid gap-4 grid-cols-1 md:grid-cols-[1fr_minmax(240px,320px)]">
      <StateLoader />
      <section aria-label="editor" className="space-y-3">
        <h1 className="text-xl font-semibold">Chess Annotator</h1>
        <Toolbar />
        <div className="relative aspect-square border rounded-md overflow-hidden">
          {/* Board + overlay */}
          <Board />
          <div className="absolute inset-0 pointer-events-none">
            <AnnotationLayer />
          </div>
        </div>
        <PieceTray />
      </section>

      <aside aria-label="side-panel" className="space-y-3">
        {metricsPanel()}
        <div className="border rounded-md p-3">
          <h2 className="font-medium mb-2">Moves</h2>
          <MoveList />
        </div>
      </aside>
    </main>
  );
}

export default ChessAnnotatorPage;
