'use client';
import React, { useState } from 'react';
import type { Square, Piece } from '@/types';
import { useChessStore } from '@/hooks/useChessStore';

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
const ranks = [8, 7, 6, 5, 4, 3, 2, 1] as const;

const pieceSrc = (p: Piece) => `/pieces/svg/classic/${p}.svg`;

const Board: React.FC = () => {
  const { position, mode, orientation, makeMove, setPiece } = useChessStore();
  const [draggedPiece, setDraggedPiece] = useState<{ piece: Piece; square: Square } | null>(null);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);

  const isFlipped = orientation === 'black';
  const displayFiles = isFlipped ? [...files].reverse() : files;
  const displayRanks = isFlipped ? [...ranks].reverse() : ranks;

  const isDark = (fileIdx: number, rankIdx: number) => (fileIdx + rankIdx) % 2 === 1;

  const handleSquareClick = (square: Square) => {
    if (mode === 'play') {
      if (selectedSquare) {
        if (selectedSquare !== square) {
          makeMove(selectedSquare, square);
        }
        setSelectedSquare(null);
      } else if (position[square]) {
        setSelectedSquare(square);
      }
    }
  };

  const handleDragStart = (e: React.DragEvent, square: Square) => {
    const piece = position[square];
    if (!piece) return;

    setDraggedPiece({ piece, square });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetSquare: Square) => {
    e.preventDefault();

    const draggedData = e.dataTransfer.getData('text/plain');

    if (draggedData) {
      if (mode === 'setup') {
        setPiece(targetSquare, draggedData as Piece);
      }
    } else if (draggedPiece) {
      if (mode === 'setup') {
        if (draggedPiece.square !== targetSquare) {
          setPiece(targetSquare, draggedPiece.piece);
          setPiece(draggedPiece.square, null);
        }
      } else if (mode === 'play') {
        makeMove(draggedPiece.square, targetSquare);
      }
    }

    setDraggedPiece(null);
  };

  const renderSquare = (fileIdx: number, rankIdx: number) => {
    const file = displayFiles[fileIdx];
    const rank = displayRanks[rankIdx];
    const square = `${file}${rank}` as Square;
    const piece = position[square];
    const bg = isDark(fileIdx, rankIdx) ? 'bg-[#769656]' : 'bg-[#EEEED2]';
    const isSelected = selectedSquare === square;

    return (
      <div
        key={square}
        className={`relative ${bg} ${isSelected ? 'ring-2 ring-blue-500' : ''} cursor-pointer`}
        data-square={square}
        onClick={() => handleSquareClick(square)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, square)}
      >
        {piece && (
          <img
            src={pieceSrc(piece)}
            alt={piece}
            className="absolute inset-0 w-full h-full object-contain p-1 pointer-events-none"
            draggable={mode === 'setup' || mode === 'play'}
            onDragStart={(e) => handleDragStart(e, square)}
          />
        )}
        <span className="absolute bottom-1 right-1 text-[10px] text-black/60 select-none pointer-events-none">
          {square}
        </span>
      </div>
    );
  };

  return (
    <div
      role="grid"
      aria-label="chess-board"
      className="w-full h-full grid grid-cols-8 grid-rows-8"
    >
      {displayRanks.map((_, rIdx) => displayFiles.map((_, fIdx) => renderSquare(fIdx, rIdx)))}
    </div>
  );
};

export default Board;
