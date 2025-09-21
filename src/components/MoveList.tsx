'use client';
import React from 'react';
import { useChessStore } from '@/hooks/useChessStore';

const MoveList: React.FC = () => {
  const { moves, currentMoveIndex, undoMove, redoMove, goToMove } = useChessStore();

  const handleMoveClick = (index: number) => {
    goToMove(index);
  };

  const canUndo = currentMoveIndex >= 0;
  const canRedo = currentMoveIndex < moves.length - 1;

  return (
    <div aria-label="move-list" className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={undoMove}
          disabled={!canUndo}
          className="px-3 py-1 text-xs bg-[var(--medium-gray)] text-white border border-[var(--light-gray)] hover:border-[var(--neon-green)] hover:text-[var(--neon-green)] disabled:opacity-50 disabled:cursor-not-allowed rounded transition-all duration-200"
        >
          ← Undo
        </button>
        <button
          type="button"
          onClick={redoMove}
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
        <ol className="space-y-1 max-h-64 overflow-y-auto">
          {moves.map((move, index) => {
            const moveNumber = Math.floor(index / 2) + 1;
            const isWhiteMove = index % 2 === 0;
            const isCurrent = index === currentMoveIndex;

            return (
              <li
                key={index}
                onClick={() => handleMoveClick(index)}
                className={`text-sm cursor-pointer px-2 py-1 rounded transition-all duration-200 ${
                  isCurrent
                    ? 'bg-[var(--neon-green)] text-black neon-glow'
                    : 'hover:bg-[var(--medium-gray)] text-white'
                }`}
              >
                {isWhiteMove && (
                  <span className="text-[var(--light-gray)] mr-1">{moveNumber}.</span>
                )}
                <span className="font-mono">
                  {move.from}
                  {move.to}
                </span>
                {move.captured && <span className="text-red-400 ml-1">x{move.captured}</span>}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

export default MoveList;
