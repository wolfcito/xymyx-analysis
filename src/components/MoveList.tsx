'use client';
import React from 'react';
import { useXymyxStore } from '@/hooks/useXymyxStore';

const MoveList: React.FC = () => {
  const { moves, currentMoveIndex, undoMove, redoMove, goToMove, undoPair, redoPair, mode } =
    useXymyxStore();

  const handleMoveClick = (index: number) => {
    goToMove(index);
  };

  const canUndo = currentMoveIndex >= 0;
  const canRedo = currentMoveIndex < moves.length - 1;

  const onUndo = () => (mode === 'play' ? undoPair() : undoMove());
  const onRedo = () => (mode === 'play' ? redoPair() : redoMove());

  return (
    <div aria-label="move-list" className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          className="px-3 py-1 text-xs bg-[var(--medium-gray)] text-white border border-[var(--light-gray)] hover:border-[var(--neon-green)] hover:text-[var(--neon-green)] disabled:opacity-50 disabled:cursor-not-allowed rounded transition-all duration-200"
        >
          ← Undo
        </button>
        <button
          type="button"
          onClick={onRedo}
          disabled={!canRedo}
          className="px-3 py-1 text-xs bg-[var(--medium-gray)] text-white border border-[var(--light-gray)] hover:border-[var(--neon-green)] hover:text-[var(--neon-green)] disabled:opacity-50 disabled:cursor-not-allowed rounded transition-all duration-200"
        >
          Redo →
        </button>
        <button
          type="button"
          onClick={() => goToMove(-1)}
          disabled={currentMoveIndex === -1}
          className="px-3 py-1 text-xs bg-[var(--medium-gray)] text-white border border-[var(--light-gray)] hover:border-[var(--neon-green)] hover:text-[var(--neon-green)] disabled:opacity-50 disabled:cursor-not-allowed rounded transition-all duration-200"
        >
          ⏮ Start
        </button>
        <button
          type="button"
          onClick={() => goToMove(moves.length - 1)}
          disabled={currentMoveIndex === moves.length - 1}
          className="px-3 py-1 text-xs bg-[var(--medium-gray)] text-white border border-[var(--light-gray)] hover:border-[var(--neon-green)] hover:text-[var(--neon-green)] disabled:opacity-50 disabled:cursor-not-allowed rounded transition-all duration-200"
        >
          End ⏭
        </button>
      </div>

      {moves.length === 0 ? (
        <div className="text-sm text-[var(--light-gray)] italic">No moves yet</div>
      ) : (
        <div className="max-h-64 overflow-y-auto space-y-1">
          {Array.from({ length: Math.ceil(moves.length / 2) }).map((_, rowIdx) => {
            const whiteIdx = rowIdx * 2;
            const blackIdx = whiteIdx + 1;
            const white = moves[whiteIdx];
            const black = moves[blackIdx];
            const moveNumber = rowIdx + 1;
            const isWhiteCurrent = currentMoveIndex === whiteIdx;
            const isBlackCurrent = currentMoveIndex === blackIdx;

            return (
              <div
                key={rowIdx}
                className="grid grid-cols-[auto_1fr_1fr] items-center gap-2 px-2 py-1 rounded hover:bg-[var(--medium-gray)]"
              >
                <div className="text-[var(--light-gray)] text-sm w-6 text-right">{moveNumber}.</div>
                <button
                  className={`text-sm font-mono text-left rounded px-1 ${
                    isWhiteCurrent ? 'bg-yellow-400 text-black' : 'text-yellow-400'
                  }`}
                  onClick={() => handleMoveClick(whiteIdx)}
                  disabled={!white}
                >
                  {white ? (
                    <>
                      {white.from}
                      {white.to}
                    </>
                  ) : (
                    <span className="text-[var(--light-gray)]">—</span>
                  )}
                </button>
                <button
                  className={`text-sm font-mono text-left rounded px-1 ${
                    isBlackCurrent ? 'bg-purple-400 text-black' : 'text-purple-400'
                  }`}
                  onClick={() => handleMoveClick(blackIdx)}
                  disabled={!black}
                >
                  {black ? (
                    <>
                      {black.from}
                      {black.to}
                    </>
                  ) : (
                    <span className="text-[var(--light-gray)]">—</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MoveList;
