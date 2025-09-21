export type Orientation = 'white' | 'black';

export type Square =
  `${'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`;

export type Piece =
  | 'wK'
  | 'wQ'
  | 'wR'
  | 'wB'
  | 'wN'
  | 'wP'
  | 'bK'
  | 'bQ'
  | 'bR'
  | 'bB'
  | 'bN'
  | 'bP';

export type Position = Partial<Record<Square, Piece>>;

export type ArrowStyle = 'solid' | 'dotted';

export type Arrow = {
  from: Square;
  to: Square;
  color: string;
  style: ArrowStyle;
  width: number;
};

export type SquareHighlight = {
  square: Square;
  color: string;
};

export type Label = {
  square: Square;
  text: string;
  color: string;
};

export type Mode = 'setup' | 'annotate' | 'play';

export type Move = {
  from: Square;
  to: Square;
  piece: Piece;
  captured?: Piece;
  promotion?: Piece;
};

export type GameState = {
  position: Position;
  moves: Move[];
  currentMoveIndex: number;
  arrows: Arrow[];
  highlights: SquareHighlight[];
  labels: Label[];
  orientation: Orientation;
  mode: Mode;
  fen: string;
};

export const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const PIECE_COLORS = {
  green: '#15803d',
  red: '#dc2626',
  yellow: '#ca8a04',
  blue: '#2563eb',
  orange: '#ea580c',
};

export const PIECE_VALUES: Record<string, Piece> = {
  wK: 'wK',
  wQ: 'wQ',
  wR: 'wR',
  wB: 'wB',
  wN: 'wN',
  wP: 'wP',
  bK: 'bK',
  bQ: 'bQ',
  bR: 'bR',
  bB: 'bB',
  bN: 'bN',
  bP: 'bP',
};
