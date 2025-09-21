import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  GameState,
  Position,
  Arrow,
  SquareHighlight,
  Label,
  Move,
  Square,
  Piece,
  Mode,
  Orientation,
} from '@/types';
import { INITIAL_FEN } from '@/types';
import { fenToPosition, positionToFen } from '@/lib/fen';
import { createShareUrl, loadStateFromUrl } from '@/lib/share';

interface ChessStore extends GameState {
  // Position management
  setPiece: (square: Square, piece: Piece | null) => void;
  clearBoard: () => void;
  setInitialPosition: () => void;

  // Mode management
  setMode: (mode: Mode) => void;
  setOrientation: (orientation: Orientation) => void;

  // Move management
  makeMove: (from: Square, to: Square) => void;
  undoMove: () => void;
  redoMove: () => void;
  goToMove: (index: number) => void;

  // Annotation management
  addArrow: (arrow: Arrow) => void;
  removeArrow: (from: Square, to: Square) => void;
  clearArrows: () => void;
  addHighlight: (highlight: SquareHighlight) => void;
  removeHighlight: (square: Square) => void;
  clearHighlights: () => void;
  addLabel: (label: Label) => void;
  removeLabel: (square: Square) => void;
  clearLabels: () => void;

  // Import/Export
  importFen: (fen: string) => void;
  exportFen: () => string;
  exportPgn: () => string;
  exportJson: () => string;

  // Sharing
  shareUrl: () => string | null;
  loadFromUrl: () => void;

  // Reset
  reset: () => void;
}

const getInitialPosition = (): Position => {
  return fenToPosition(INITIAL_FEN);
};

const initialState: GameState = {
  position: getInitialPosition(),
  moves: [],
  currentMoveIndex: -1,
  arrows: [],
  highlights: [],
  labels: [],
  orientation: 'white',
  mode: 'setup',
  fen: INITIAL_FEN,
};

export const useChessStore = create<ChessStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setPiece: (square, piece) =>
        set((state) => {
          const newPosition = { ...state.position };
          if (piece) {
            newPosition[square] = piece;
          } else {
            delete newPosition[square];
          }
          return {
            position: newPosition,
            fen: positionToFen(newPosition),
          };
        }),

      clearBoard: () =>
        set(() => ({
          position: {},
          fen: '8/8/8/8/8/8/8/8 w - - 0 1',
        })),

      setInitialPosition: () =>
        set(() => ({
          position: getInitialPosition(),
          fen: INITIAL_FEN,
        })),

      setMode: (mode) => set({ mode }),

      setOrientation: (orientation) => set({ orientation }),

      makeMove: (from, to) =>
        set((state) => {
          const piece = state.position[from];
          if (!piece) return state;

          const captured = state.position[to];
          const newPosition = { ...state.position };
          newPosition[to] = piece;
          delete newPosition[from];

          const move: Move = { from, to, piece, captured };
          const newMoves = state.moves.slice(0, state.currentMoveIndex + 1);
          newMoves.push(move);

          return {
            position: newPosition,
            moves: newMoves,
            currentMoveIndex: newMoves.length - 1,
            fen: positionToFen(newPosition),
          };
        }),

      undoMove: () =>
        set((state) => {
          if (state.currentMoveIndex < 0) return state;

          const move = state.moves[state.currentMoveIndex];
          const newPosition = { ...state.position };

          newPosition[move.from] = move.piece;
          if (move.captured) {
            newPosition[move.to] = move.captured;
          } else {
            delete newPosition[move.to];
          }

          return {
            position: newPosition,
            currentMoveIndex: state.currentMoveIndex - 1,
            fen: positionToFen(newPosition),
          };
        }),

      redoMove: () =>
        set((state) => {
          if (state.currentMoveIndex >= state.moves.length - 1) return state;

          const move = state.moves[state.currentMoveIndex + 1];
          const newPosition = { ...state.position };

          newPosition[move.to] = move.piece;
          delete newPosition[move.from];

          return {
            position: newPosition,
            currentMoveIndex: state.currentMoveIndex + 1,
            fen: positionToFen(newPosition),
          };
        }),

      goToMove: (index) =>
        set((state) => {
          if (index < -1 || index >= state.moves.length) return state;

          const position = getInitialPosition();
          for (let i = 0; i <= index; i++) {
            const move = state.moves[i];
            position[move.to] = move.piece;
            delete position[move.from];
          }

          return {
            position,
            currentMoveIndex: index,
            fen: positionToFen(position),
          };
        }),

      addArrow: (arrow) =>
        set((state) => ({
          arrows: [
            ...state.arrows.filter((a) => !(a.from === arrow.from && a.to === arrow.to)),
            arrow,
          ],
        })),

      removeArrow: (from, to) =>
        set((state) => ({
          arrows: state.arrows.filter((a) => !(a.from === from && a.to === to)),
        })),

      clearArrows: () => set({ arrows: [] }),

      addHighlight: (highlight) =>
        set((state) => ({
          highlights: [...state.highlights.filter((h) => h.square !== highlight.square), highlight],
        })),

      removeHighlight: (square) =>
        set((state) => ({
          highlights: state.highlights.filter((h) => h.square !== square),
        })),

      clearHighlights: () => set({ highlights: [] }),

      addLabel: (label) =>
        set((state) => ({
          labels: [...state.labels.filter((l) => l.square !== label.square), label],
        })),

      removeLabel: (square) =>
        set((state) => ({
          labels: state.labels.filter((l) => l.square !== square),
        })),

      clearLabels: () => set({ labels: [] }),

      importFen: (fen) =>
        set(() => ({
          position: fenToPosition(fen),
          fen,
          moves: [],
          currentMoveIndex: -1,
        })),

      exportFen: () => get().fen,

      exportPgn: () => {
        const state = get();
        let pgn = '';
        state.moves.forEach((move, index) => {
          if (index % 2 === 0) {
            pgn += `${Math.floor(index / 2) + 1}. `;
          }
          pgn += `${move.from}${move.to} `;
        });
        return pgn.trim();
      },

      exportJson: () => {
        const state = get();
        return JSON.stringify(
          {
            position: state.position,
            moves: state.moves,
            arrows: state.arrows,
            highlights: state.highlights,
            labels: state.labels,
            fen: state.fen,
          },
          null,
          2
        );
      },

      shareUrl: () => {
        const state = get();
        return createShareUrl({
          position: state.position,
          moves: state.moves,
          arrows: state.arrows,
          highlights: state.highlights,
          labels: state.labels,
          fen: state.fen,
          orientation: state.orientation,
        });
      },

      loadFromUrl: () => {
        const urlState = loadStateFromUrl();
        if (urlState) {
          set((state) => ({
            ...state,
            ...urlState,
          }));
        }
      },

      reset: () => set(initialState),
    }),
    {
      name: 'chess-annotator-storage',
      partialize: (state) => ({
        position: state.position,
        moves: state.moves,
        currentMoveIndex: state.currentMoveIndex,
        arrows: state.arrows,
        highlights: state.highlights,
        labels: state.labels,
        orientation: state.orientation,
        mode: state.mode,
        fen: state.fen,
      }),
    }
  )
);
