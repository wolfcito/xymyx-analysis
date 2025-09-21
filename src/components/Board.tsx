'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import type { Square, Piece } from '@/types';
import { useChessStore } from '@/hooks/useChessStore';

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
const ranks = [8, 7, 6, 5, 4, 3, 2, 1] as const;

const pieceSrc = (p: Piece) => {
  const pieceMap: Record<Piece, string> = {
    wK: '/pieces/png/xymyx/rey-dorado.png',
    wQ: '/pieces/png/xymyx/dama-dorado.png',
    wR: '/pieces/png/xymyx/torre-dorado.png',
    wB: '/pieces/png/xymyx/alfil-dorado.png',
    wN: '/pieces/png/xymyx/caballo-dorado.png',
    wP: '/pieces/png/xymyx/peon-dorado.png',
    bK: '/pieces/png/xymyx/rey-morado.png',
    bQ: '/pieces/png/xymyx/dama-morado.png',
    bR: '/pieces/png/xymyx/torre-morado.png',
    bB: '/pieces/png/xymyx/alfil-morado.png',
    bN: '/pieces/png/xymyx/caballo-morado.png',
    bP: '/pieces/png/xymyx/peon-morado.png',
  };
  return pieceMap[p];
};

// Keep these for fallback or other uses
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
    const squareOpacity = `opacity-[var(--square-transparency)]`;
    const isSelected = selectedSquare === square;

    return (
      <div
        key={square}
        className={`relative ${isSelected ? 'ring-2 ring-[var(--neon-green)] neon-glow' : ''} cursor-pointer border border-[var(--light-gray)] hover:border-[var(--neon-green)] transition-all duration-200`}
        data-square={square}
        onClick={() => handleSquareClick(square)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, square)}
      >
        {/* Background square with transparency */}
        <div className={`absolute inset-0 ${bg} ${squareOpacity}`}></div>
        {piece && (
          <div
            className={`absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none ${
              mode === 'setup' || mode === 'play' ? 'cursor-pointer' : ''
            }`}
            draggable={mode === 'setup' || mode === 'play'}
            onDragStart={(e) => handleDragStart(e, square)}
          >
            <Image
              src={pieceSrc(piece)}
              alt={pieceLetter(piece)}
              width={40}
              height={40}
              className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 object-contain drop-shadow-lg"
              draggable={false}
            />
          </div>
        )}
        <span className="absolute bottom-1 right-1 text-[10px] text-[var(--neon-green)] select-none pointer-events-none font-mono">
          {square}
        </span>
      </div>
    );
  };

  return (
    <div className="relative w-full h-full">
      <div
        role="grid"
        aria-label="chess-board"
        className="w-full h-full aspect-square grid grid-cols-8 grid-rows-8"
      >
        {displayRanks.map((_, rIdx) => displayFiles.map((_, fIdx) => renderSquare(fIdx, rIdx)))}
      </div>
    </div>
  );
};

export default Board;
