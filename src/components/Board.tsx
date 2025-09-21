'use client';
import React, { useState } from 'react';
import type { Square, Piece } from '@/types';
import { useChessStore } from '@/hooks/useChessStore';

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
const ranks = [8, 7, 6, 5, 4, 3, 2, 1] as const;

// const pieceSrc = (p: Piece) => `/pieces/svg/classic/${p}.svg`; // No longer used - pieces are now displayed as letters

const pieceLetter = (p: Piece) => {
  const pieceMap: Record<Piece, string> = {
    wK: 'K',
    wQ: 'Q',
    wR: 'R',
    wB: 'B',
    wN: 'N',
    wP: 'P',
    bK: 'K',
    bQ: 'Q',
    bR: 'R',
    bB: 'B',
    bN: 'N',
    bP: 'P',
  };
  return pieceMap[p];
};

const pieceColor = (p: Piece) => {
  return p.startsWith('w') ? 'text-white' : 'text-black';
};

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
    const bg = isDark(fileIdx, rankIdx) ? 'bg-[#2a2a2a]' : 'bg-[#1a1a1a]';
    const isSelected = selectedSquare === square;

    return (
      <div
        key={square}
        className={`relative ${bg} ${isSelected ? 'ring-2 ring-[var(--neon-green)] neon-glow' : ''} cursor-pointer border border-[var(--light-gray)] hover:border-[var(--neon-green)] transition-all duration-200`}
        data-square={square}
        onClick={() => handleSquareClick(square)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, square)}
      >
        {piece && (
          <div
            className={`absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none ${
              mode === 'setup' || mode === 'play' ? 'cursor-pointer' : ''
            }`}
            draggable={mode === 'setup' || mode === 'play'}
            onDragStart={(e) => handleDragStart(e, square)}
          >
            <div
              className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-[var(--dark-gray)] border-2 ${piece.startsWith('w') ? 'border-white' : 'border-[var(--light-gray)]'} flex items-center justify-center ${pieceColor(piece)} font-bold text-sm sm:text-base lg:text-lg shadow-lg`}
            >
              {pieceLetter(piece)}
            </div>
          </div>
        )}
        <span className="absolute bottom-1 right-1 text-[10px] text-[var(--neon-green)] select-none pointer-events-none font-mono">
          {square}
        </span>
      </div>
    );
  };

  return (
    <div className="relative w-full h-full min-h-[400px] max-h-[80vh]">
      <div
        role="grid"
        aria-label="chess-board"
        className="w-full h-full grid grid-cols-8 grid-rows-8 min-h-[400px]"
      >
        {displayRanks.map((_, rIdx) => displayFiles.map((_, fIdx) => renderSquare(fIdx, rIdx)))}
      </div>

      {/* Move Dropdown */}
      <div className="absolute bottom-2 left-2 lg:bottom-4 lg:left-4 bg-[var(--dark-gray)] border border-[var(--neon-green)] rounded-lg p-2 lg:p-3 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-[var(--neon-green)] flex items-center justify-center">
            <span className="text-black font-bold text-sm lg:text-lg">N</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[var(--neon-green)] text-xs font-semibold">Move here</span>
            <span className="text-white text-xs">as dropdown</span>
          </div>
          <svg
            className="w-3 h-3 lg:w-4 lg:h-4 text-[var(--neon-green)]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Board;
