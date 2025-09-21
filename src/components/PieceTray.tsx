'use client';
import React, { useState } from 'react';
import type { Piece } from '@/types';
import { useChessStore } from '@/hooks/useChessStore';

const pieces: Piece[] = ['wK', 'wQ', 'wR', 'wB', 'wN', 'wP', 'bK', 'bQ', 'bR', 'bB', 'bN', 'bP'];

const pieceSrc = (p: Piece) => `/pieces/svg/classic/${p}.svg`;

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
      className={`relative w-12 h-12 cursor-pointer rounded-md border-2 ${
        selectedPiece === piece
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white hover:bg-gray-50'
      }`}
      onClick={() => handlePieceClick(piece)}
      draggable
      onDragStart={(e) => handleDragStart(e, piece)}
    >
      <img
        src={pieceSrc(piece)}
        alt={piece}
        className="w-full h-full object-contain p-1 pointer-events-none"
      />
    </div>
  );

  return (
    <div aria-label="piece-tray" className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700">Piece Tray</h3>
      <div className="grid grid-cols-6 gap-2">{pieces.map(renderPiece)}</div>
      {selectedPiece && (
        <div className="text-xs text-gray-600">
          Selected: {selectedPiece}. Click on the board to place this piece.
        </div>
      )}
    </div>
  );
};

export default PieceTray;
