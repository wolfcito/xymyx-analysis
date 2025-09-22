'use client';
import React from 'react';
import { useChessStore } from '@/hooks/useChessStore';
import { PIECE_COLORS } from '@/types';

const AnnotatePanel: React.FC = () => {
  const {
    clearArrows,
    clearHighlights,
    clearLabels,
    annotateColor,
    annotateStroke,
    annotateCircleRadius,
    setAnnotateColor,
    setAnnotateStroke,
    setAnnotateCircleRadius,
    annotateHighlightOpacity,
    setAnnotateHighlightOpacity,
  } = useChessStore();

  return (
    <div className="space-y-3">
      <div className="text-sm text-white">Config Annotate</div>

      {/* Color palette */}
      <div className="space-y-2">
        <div className="text-xs text-white/70">Color</div>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(PIECE_COLORS).map(([name, color]) => (
            <button
              key={name}
              className={`w-6 h-6 rounded-full border-2 ${
                annotateColor === color
                  ? 'border-[var(--neon-green)]'
                  : 'border-[var(--light-gray)]'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setAnnotateColor(color)}
              title={name}
            />
          ))}
        </div>
      </div>

      {/* Size controls */}
      <div className="grid grid-cols-1 gap-3">
        <label className="text-xs text-white/70 flex items-center justify-between gap-2">
          <span>Grosor</span>
          <input
            type="range"
            min={1}
            max={4}
            step={0.2}
            value={annotateStroke}
            onChange={(e) => setAnnotateStroke(parseFloat(e.target.value))}
            className="flex-1 mx-2"
          />
          <span className="w-8 text-right">{annotateStroke.toFixed(1)}</span>
        </label>

        <label className="text-xs text-white/70 flex items-center justify-between gap-2">
          <span>Radio</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.2}
            value={annotateCircleRadius}
            onChange={(e) => setAnnotateCircleRadius(parseFloat(e.target.value))}
            className="flex-1 mx-2"
          />
          <span className="w-8 text-right">{annotateCircleRadius.toFixed(1)}</span>
        </label>

        <label className="text-xs text-white/70 flex items-center justify-between gap-2">
          <span>Opacidad highlight</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={annotateHighlightOpacity}
            onChange={(e) => setAnnotateHighlightOpacity(parseFloat(e.target.value))}
            className="flex-1 mx-2"
          />
          <span className="w-10 text-right">{annotateHighlightOpacity.toFixed(2)}</span>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          className="px-3 py-2 text-sm bg-[var(--medium-gray)] text-white border border-[var(--light-gray)] rounded hover:border-[var(--neon-green)] transition"
          onClick={clearArrows}
        >
          Limpiar flechas
        </button>
        <button
          className="px-3 py-2 text-sm bg-[var(--medium-gray)] text-white border border-[var(--light-gray)] rounded hover:border-[var(--neon-green)] transition"
          onClick={clearHighlights}
        >
          Limpiar casillas
        </button>
        <button
          className="px-3 py-2 text-sm bg-[var(--medium-gray)] text-white border border-[var(--light-gray)] rounded hover:border-[var(--neon-green)] transition col-span-2"
          onClick={clearLabels}
        >
          Limpiar etiquetas
        </button>
      </div>
    </div>
  );
};

export default AnnotatePanel;
