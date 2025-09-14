import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Board from '@/components/Board';
import AnnotationLayer from '@/components/AnnotationLayer';

describe('basic components', () => {
  it('renders Board with grid role', () => {
    render(<Board />);
    const board = screen.getByRole('grid', { name: /chess-board/i });
    expect(board).toBeInTheDocument();
  });

  it('renders AnnotationLayer as SVG', () => {
    render(<AnnotationLayer />);
    const layer = screen.getByLabelText(/annotation-layer/i);
    expect(layer.tagName.toLowerCase()).toBe('svg');
  });
});

