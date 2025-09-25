'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import type { Piece } from '@/types';
import { useXymyxStore } from '@/hooks/useXymyxStore';

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

// color helper unused for image-based pieces; removed to satisfy lint

const PieceTray: React.FC = () => {
  const {
    mode,
    selectedPlacementPiece,
    setSelectedPlacementPiece,
    orientation,
    setOrientation,
    clearBoard,
    setInitialPosition,
  } = useXymyxStore();
  const [squareTransparency, setSquareTransparency] = React.useState<number>(0);
  const [pieceSize, setPieceSize] = React.useState<number>(1);
  const [boardSize, setBoardSize] = React.useState<number>(1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPlacementPiece(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setSelectedPlacementPiece]);

  // Initialize CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--piece-scale', pieceSize.toString());
    document.documentElement.style.setProperty('--board-scale', boardSize.toString());
  }, [pieceSize, boardSize]);

  if (mode !== 'setup') {
    return null;
  }

  const handleDragStart = (e: React.DragEvent, piece: Piece) => {
    e.dataTransfer.setData('text/plain', piece);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handlePieceClick = (piece: Piece) => {
    setSelectedPlacementPiece(selectedPlacementPiece === piece ? null : piece);
  };

  const renderPiece = (piece: Piece) => (
    <div
      key={piece}
      className={`relative w-13 h-13 cursor-pointer rounded border-2 transition-all duration-200 ${
        selectedPlacementPiece === piece
          ? 'border-[var(--neon-green)] bg-[var(--neon-green)]/20 inset-0'
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
      <h3 className="text-sm text-white tracking-wide">Piece Tray</h3>
      <div className="grid grid-cols-6 gap-2">{pieces.map(renderPiece)}</div>
      {selectedPlacementPiece ? (
        <div className="text-xs text-white font-mono">
          Selected: {selectedPlacementPiece}. Click any square to place repeatedly. Press Esc to
          clear.
        </div>
      ) : (
        <div className="text-xs text-white font-mono">
          Click any piece to place repeatedly. Press Esc to clear.
        </div>
      )}

      {/* Board controls relocated here */}
      <div className="mt-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setOrientation(orientation === 'white' ? 'black' : 'white')}
            className="px-3 py-2 text-sm bg-[var(--medium-gray)] text-white border border-[var(--light-gray)] rounded hover:border-[var(--neon-green)] transition"
          >
            Flip ({orientation === 'white' ? 'gold' : 'purple'})
          </button>
          <button
            onClick={clearBoard}
            className="px-3 py-2 text-sm bg-[var(--medium-gray)] text-white border border-[var(--light-gray)] rounded hover:border-[var(--neon-green)] transition"
          >
            Clear Board
          </button>
          <button
            onClick={setInitialPosition}
            className="px-3 py-2 text-sm bg-[var(--medium-gray)] text-white border border-[var(--light-gray)] rounded hover:border-[var(--neon-green)] transition col-span-2"
          >
            Initial Position
          </button>
        </div>
        <label className="text-xs text-white/70 flex items-center justify-between gap-2">
          <span>Square Transparency</span>
          <input
            type="range"
            min={0}
            max={0.9}
            step={0.05}
            value={squareTransparency}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setSquareTransparency(v);
              document.documentElement.style.setProperty('--square-transparency', v.toString());
            }}
            className="flex-1 mx-2"
          />
          <span className="w-8 text-right">{squareTransparency.toFixed(2)}</span>
        </label>
        <label className="text-xs text-white/70 flex items-center justify-between gap-2">
          <span>Piece Size</span>
          <input
            type="range"
            min={0.5}
            max={2}
            step={0.1}
            value={pieceSize}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setPieceSize(v);
              document.documentElement.style.setProperty('--piece-scale', v.toString());
            }}
            className="flex-1 mx-2"
          />
          <span className="w-8 text-right">{pieceSize.toFixed(1)}</span>
        </label>
        <label className="text-xs text-white/70 flex items-center justify-between gap-2">
          <span>Board Size</span>
          <input
            type="range"
            min={0.7}
            max={1.5}
            step={0.1}
            value={boardSize}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              setBoardSize(v);
              document.documentElement.style.setProperty('--board-scale', v.toString());
            }}
            className="flex-1 mx-2"
          />
          <span className="w-8 text-right">{boardSize.toFixed(1)}</span>
        </label>
      </div>
    </div>
  );
};

export default PieceTray;
