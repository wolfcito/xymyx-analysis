import React from 'react';
import type { Square } from '@/types';

type Piece = 'wK' | 'wQ' | 'wR' | 'wB' | 'wN' | 'wP' | 'bK' | 'bQ' | 'bR' | 'bB' | 'bN' | 'bP';

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
const ranks = [8, 7, 6, 5, 4, 3, 2, 1] as const;

const pieceSrc = (p: Piece) => `/pieces/svg/classic/${p}.svg`;

const initialPosition = (): Record<Square, Piece> => {
  const pos: Partial<Record<Square, Piece>> = {};
  const add = (file: string, rank: number, p: Piece) => {
    pos[`${file}${rank}` as Square] = p;
  };
  // Black
  ['a', 'h'].forEach((f) => add(f, 8, 'bR'));
  ['b', 'g'].forEach((f) => add(f, 8, 'bN'));
  ['c', 'f'].forEach((f) => add(f, 8, 'bB'));
  add('d', 8, 'bQ');
  add('e', 8, 'bK');
  files.forEach((f) => add(f, 7, 'bP'));
  // White
  ['a', 'h'].forEach((f) => add(f, 1, 'wR'));
  ['b', 'g'].forEach((f) => add(f, 1, 'wN'));
  ['c', 'f'].forEach((f) => add(f, 1, 'wB'));
  add('d', 1, 'wQ');
  add('e', 1, 'wK');
  files.forEach((f) => add(f, 2, 'wP'));
  return pos as Record<Square, Piece>;
};

const Board: React.FC = () => {
  const pos = initialPosition();
  const isDark = (fileIdx: number, rankIdx: number) => (fileIdx + rankIdx) % 2 === 1;
  const renderSquare = (fileIdx: number, rankIdx: number) => {
    const square = `${files[fileIdx]}${ranks[rankIdx]}` as Square;
    const piece = pos[square];
    const bg = isDark(fileIdx, rankIdx) ? 'bg-[#769656]' : 'bg-[#EEEED2]';
    const label = `${files[fileIdx]}${ranks[rankIdx]}`;
    return (
      <div key={square} className={`relative ${bg}`} data-square={square}>
        {piece ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={pieceSrc(piece)}
            alt={piece}
            className="absolute inset-0 w-full h-full object-contain p-1"
            draggable={false}
          />
        ) : null}
        <span className="absolute bottom-1 right-1 text-[10px] text-black/60 select-none">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div role="grid" aria-label="chess-board" className="w-full h-full grid grid-cols-8 grid-rows-8">
      {ranks.map((_, rIdx) => files.map((_, fIdx) => renderSquare(fIdx, rIdx))) /* 8x8 */}
    </div>
  );
};

export default Board;
