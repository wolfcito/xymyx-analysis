import type { Position, Piece, Square } from '@/types';

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;

const fenPieceMap: Record<string, Piece> = {
  K: 'wK',
  Q: 'wQ',
  R: 'wR',
  B: 'wB',
  N: 'wN',
  P: 'wP',
  k: 'bK',
  q: 'bQ',
  r: 'bR',
  b: 'bB',
  n: 'bN',
  p: 'bP',
};

const pieceToFenMap: Record<Piece, string> = {
  wK: 'K',
  wQ: 'Q',
  wR: 'R',
  wB: 'B',
  wN: 'N',
  wP: 'P',
  bK: 'k',
  bQ: 'q',
  bR: 'r',
  bB: 'b',
  bN: 'n',
  bP: 'p',
};

export function fenToPosition(fen: string): Position {
  const position: Position = {};
  const parts = fen.split(' ');
  const boardPart = parts[0];

  const ranks = boardPart.split('/');

  ranks.forEach((rankStr, rankIndex) => {
    let fileIndex = 0;

    for (const char of rankStr) {
      if (char >= '1' && char <= '8') {
        fileIndex += parseInt(char);
      } else if (fenPieceMap[char]) {
        const square = `${files[fileIndex]}${8 - rankIndex}` as Square;
        position[square] = fenPieceMap[char];
        fileIndex++;
      }
    }
  });

  return position;
}

export function positionToFen(position: Position): string {
  let fen = '';

  for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
    let rankStr = '';
    let emptyCount = 0;

    for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
      const square = `${files[fileIndex]}${8 - rankIndex}` as Square;
      const piece = position[square];

      if (piece) {
        if (emptyCount > 0) {
          rankStr += emptyCount.toString();
          emptyCount = 0;
        }
        rankStr += pieceToFenMap[piece];
      } else {
        emptyCount++;
      }
    }

    if (emptyCount > 0) {
      rankStr += emptyCount.toString();
    }

    fen += rankStr;
    if (rankIndex < 7) {
      fen += '/';
    }
  }

  fen += ' w - - 0 1';

  return fen;
}

export function isValidFen(fen: string): boolean {
  try {
    const parts = fen.split(' ');
    if (parts.length < 4) return false;

    const boardPart = parts[0];
    const ranks = boardPart.split('/');
    if (ranks.length !== 8) return false;

    for (const rank of ranks) {
      let fileCount = 0;
      for (const char of rank) {
        if (char >= '1' && char <= '8') {
          fileCount += parseInt(char);
        } else if (fenPieceMap[char]) {
          fileCount++;
        } else {
          return false;
        }
      }
      if (fileCount !== 8) return false;
    }

    return true;
  } catch {
    return false;
  }
}

export const parseFen = (fen: string) => fen.trim();
export const isStartpos = (fen: string) => fen === 'startpos';
