export type Orientation = 'white' | 'black';

export type Square = `${'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h'}${1|2|3|4|5|6|7|8}`;

export type ArrowStyle = 'solid' | 'dotted';

export type Arrow = {
  from: Square;
  to: Square;
  color: string; // hex
  style: ArrowStyle;
  width: number; // px
};

export type SquareHighlight = {
  square: Square;
  color: string; // hex
};

