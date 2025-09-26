'use client';
import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Square, Type } from 'lucide-react';
import { useXymyxStore } from '@/hooks/useXymyxStore';
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
  } = useXymyxStore();

  return (
    <div className="space-y-3">
      <div className="text-sm text-white">Config Annotate</div>

      {/* Color palette */}
      <div className="space-y-2">
        <div className="flex gap-2 flex-wrap">
          <div className="text-xs text-white/70">Color</div>
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
            min={0.1}
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

      <div className="grid grid-cols-3 gap-2">
        {/* Clear Arrows Button */}
        <div className="panel-button">
          <Image
            src="/scene/010_background-btn2.png"
            alt="Button background"
            fill
            className="panel-button-bg"
          />
          <button
            onClick={clearArrows}
            className="panel-button-text flex items-center justify-center"
            title="Limpiar flechas"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Clear Highlights Button */}
        <div className="panel-button">
          <Image
            src="/scene/010_background-btn2.png"
            alt="Button background"
            fill
            className="panel-button-bg"
          />
          <button
            onClick={clearHighlights}
            className="panel-button-text flex items-center justify-center"
            title="Limpiar casillas"
          >
            <Square className="w-4 h-4" />
          </button>
        </div>

        {/* Clear Labels Button */}
        <div className="panel-button">
          <Image
            src="/scene/010_background-btn2.png"
            alt="Button background"
            fill
            className="panel-button-bg"
          />
          <button
            onClick={clearLabels}
            className="panel-button-text flex items-center justify-center"
            title="Limpiar etiquetas"
          >
            <Type className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnotatePanel;
