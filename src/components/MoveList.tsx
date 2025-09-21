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
      <div className="flex gap-2">
        <button
          type="button"
          onClick={undoMove}
          disabled={!canUndo}
          className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded"
        >
          ← Undo
        </button>
        <button
          type="button"
          onClick={redoMove}
          disabled={!canRedo}
          className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded"
        >
          Redo →
        </button>
        <button
          type="button"
          onClick={() => goToMove(-1)}
          disabled={currentMoveIndex === -1}
          className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded"
        >
          ⏮ Start
        </button>
        <button
          type="button"
          onClick={() => goToMove(moves.length - 1)}
          disabled={currentMoveIndex === moves.length - 1}
          className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded"
        >
          End ⏭
        </button>
      </div>

      {moves.length === 0 ? (
        <div className="text-sm text-gray-500 italic">No moves yet</div>
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
                className={`text-sm cursor-pointer px-2 py-1 rounded ${
                  isCurrent ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                }`}
              >
                {isWhiteMove && <span className="text-gray-600 mr-1">{moveNumber}.</span>}
                <span className="font-mono">
                  {move.from}
                  {move.to}
                </span>
                {move.captured && <span className="text-red-600 ml-1">x{move.captured}</span>}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

export default MoveList;
