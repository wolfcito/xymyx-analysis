import type { GameState } from '@/types';

export const encodeState = (state: Partial<GameState>) => {
  try {
    const compressed = JSON.stringify(state);
    return encodeURIComponent(btoa(compressed));
  } catch {
    return '';
  }
};

export const decodeState = (encoded: string): Partial<GameState> | null => {
  try {
    const decoded = atob(decodeURIComponent(encoded));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

export const createShareUrl = (state: Partial<GameState>) => {
  const encoded = encodeState(state);
  if (!encoded) return null;

  const url = new URL(window.location.href);
  url.searchParams.set('s', encoded);
  return url.toString();
};

export const loadStateFromUrl = (): Partial<GameState> | null => {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('s');

  if (!encoded) return null;
  return decodeState(encoded);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};
