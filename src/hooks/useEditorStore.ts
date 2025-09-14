// Placeholder store. Replace with Zustand in a later step.
export type EditorState = {
  fen: string;
  moves: string[];
};

export function useEditorStoreMock(): [EditorState, (next: Partial<EditorState>) => void] {
  // Lightweight local state mock to avoid external deps until Zustand is added.
  // Intentionally simple; pages/components can swap to Zustand later.
  let state: EditorState = { fen: 'startpos', moves: [] };
  const setState = (next: Partial<EditorState>) => {
    state = { ...state, ...next };
  };
  return [state, setState];
}

