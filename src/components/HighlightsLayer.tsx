'use client';
import React from 'react';
import { useXymyxStore } from '@/hooks/useXymyxStore';

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
const ranks = [8, 7, 6, 5, 4, 3, 2, 1] as const;

const HighlightsLayer: React.FC = () => {
  const { orientation, highlights, annotateHighlightOpacity } = useXymyxStore();

  const isFlipped = orientation === 'black';
  const displayFiles = isFlipped ? [...files].reverse() : files;
  const displayRanks = isFlipped ? [...ranks].reverse() : ranks;

  return (
    <svg
      aria-label="highlights-layer"
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
    >
      {highlights.map((h) => {
        const fileIndex = displayFiles.indexOf(h.square[0] as (typeof displayFiles)[number]);
        const rankIndex = displayRanks.indexOf(
          parseInt(h.square[1]) as (typeof displayRanks)[number]
        );
        return (
          <rect
            key={h.square}
            x={fileIndex * (100 / 8)}
            y={rankIndex * (100 / 8)}
            width={100 / 8}
            height={100 / 8}
            fill={h.color}
            fillOpacity={annotateHighlightOpacity}
          />
        );
      })}
    </svg>
  );
};

export default HighlightsLayer;
