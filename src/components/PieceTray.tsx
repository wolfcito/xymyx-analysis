'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import type { Piece } from '@/types';
import { useChessStore } from '@/hooks/useChessStore';

const pieces: Piece[] = ['wK', 'wQ', 'wR', 'wB', 'wN', 'wP', 'bK', 'bQ', 'bR', 'bB', 'bN', 'bP'];

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

const PieceTray: React.FC = () => {
  const { mode } = useChessStore();
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);

  if (mode !== 'setup') {
    return null;
  }

  const handleDragStart = (e: React.DragEvent, piece: Piece) => {
    e.dataTransfer.setData('text/plain', piece);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handlePieceClick = (piece: Piece) => {
    setSelectedPiece(selectedPiece === piece ? null : piece);
  };

  const renderPiece = (piece: Piece) => (
    <div
      key={piece}
      className={`relative w-13 h-13 cursor-pointer rounded border-2 transition-all duration-200 ${
        selectedPiece === piece
          ? 'border-[var(--neon-green)] bg-[var(--neon-green)]/20 neon-glow'
          : 'border-[var(--light-gray)] bg-[var(--medium-gray)] hover:border-[var(--neon-green)] hover:bg-[var(--neon-green)]/10'
      }`}
      onClick={() => handlePieceClick(piece)}
      draggable
      onDragStart={(e) => handleDragStart(e, piece)}
    >
      <div className="w-full h-full flex items-center justify-center p-1">
        <Image
          src={pieceSrc(piece)}
          alt={pieceLetter(piece)}
          width={52}
          height={52}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
    </div>
  );

  return (
    <div aria-label="piece-tray" className="space-y-3">
      <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Piece Tray</h3>
      <div className="grid grid-cols-6 gap-2">{pieces.map(renderPiece)}</div>
      {selectedPiece && (
        <div className="text-xs text-[var(--neon-green)] font-mono">
          Selected: {selectedPiece}. Click on the board to place this piece.
        </div>
      )}
    </div>
  );
};

export default PieceTray;
