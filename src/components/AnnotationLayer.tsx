'use client';
import React, { useState, useRef } from 'react';
import { useXymyxStore } from '@/hooks/useXymyxStore';
import type { Square, Arrow } from '@/types';
// colors are chosen from AnnotatePanel; no local palette here

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
const ranks = [8, 7, 6, 5, 4, 3, 2, 1] as const;

const AnnotationLayer: React.FC = () => {
  const {
    mode,
    orientation,
    arrows,
    highlights,
    addArrow,
    removeArrow,
    addHighlight,
    removeHighlight,
    annotateColor,
    annotateStroke,
    annotateCircleRadius,
  } = useXymyxStore();
  const [isDrawing, setIsDrawing] = useState(false);
  const [startSquare, setStartSquare] = useState<Square | null>(null);
  const [dragPoint, setDragPoint] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const isFlipped = orientation === 'black';
  const displayFiles = isFlipped ? [...files].reverse() : files;
  const displayRanks = isFlipped ? [...ranks].reverse() : ranks;

  const getSquareFromCoords = (x: number, y: number): Square | null => {
    if (!svgRef.current) return null;

    const rect = svgRef.current.getBoundingClientRect();
    const relativeX = x - rect.left;
    const relativeY = y - rect.top;

    const fileIndex = Math.floor((relativeX / rect.width) * 8);
    const rankIndex = Math.floor((relativeY / rect.height) * 8);

    if (fileIndex < 0 || fileIndex >= 8 || rankIndex < 0 || rankIndex >= 8) {
      return null;
    }

    const file = displayFiles[fileIndex];
    const rank = displayRanks[rankIndex];
    return `${file}${rank}` as Square;
  };

  const getSquareCenter = (square: Square): { x: number; y: number } => {
    const fileIndex = displayFiles.indexOf(square[0] as (typeof displayFiles)[number]);
    const rankIndex = displayRanks.indexOf(parseInt(square[1]) as (typeof displayRanks)[number]);

    return {
      x: (fileIndex + 0.5) * (100 / 8),
      y: (rankIndex + 0.5) * (100 / 8),
    };
  };

  const getRelativePoint = (clientX: number, clientY: number): { x: number; y: number } | null => {
    if (!svgRef.current) return null;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    if (x < 0 || x > 100 || y < 0 || y > 100) return null;
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (mode !== 'annotate') return;

    const square = getSquareFromCoords(e.clientX, e.clientY);
    if (!square) return;

    if (e.shiftKey) {
      const existing = highlights.find((h) => h.square === square);
      if (existing) {
        removeHighlight(square);
      } else {
        addHighlight({ square, color: annotateColor });
      }
    } else {
      setIsDrawing(true);
      setStartSquare(square);
      const p = getRelativePoint(e.clientX, e.clientY);
      setDragPoint(p);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (mode !== 'annotate' || !isDrawing || !startSquare) return;

    const endSquare = getSquareFromCoords(e.clientX, e.clientY);
    if (endSquare && endSquare !== startSquare) {
      const existingArrow = arrows.find((a) => a.from === startSquare && a.to === endSquare);
      if (existingArrow) {
        removeArrow(startSquare, endSquare);
      } else {
        addArrow({
          from: startSquare,
          to: endSquare,
          color: annotateColor,
          style: 'solid',
          width: annotateStroke,
        });
      }
    }

    setIsDrawing(false);
    setStartSquare(null);
    setDragPoint(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const p = getRelativePoint(e.clientX, e.clientY);
    if (p) setDragPoint(p);
  };

  const renderArrow = (arrow: Arrow) => {
    const start = getSquareCenter(arrow.from);
    const end = getSquareCenter(arrow.to);

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const unitX = dx / length;
    const unitY = dy / length;

    const arrowHeadSize = 1.8;
    const circleRadius = annotateCircleRadius; // keep circle + line perfectly connected
    const stroke = annotateStroke; // configurable stroke
    const arrowStart = {
      x: start.x + unitX * circleRadius,
      y: start.y + unitY * circleRadius,
    };
    const arrowEnd = {
      x: end.x - unitX * 2,
      y: end.y - unitY * 2,
    };

    const arrowHeadLeft = {
      x: arrowEnd.x - unitX * arrowHeadSize + unitY * arrowHeadSize * 0.5,
      y: arrowEnd.y - unitY * arrowHeadSize - unitX * arrowHeadSize * 0.5,
    };
    const arrowHeadRight = {
      x: arrowEnd.x - unitX * arrowHeadSize - unitY * arrowHeadSize * 0.5,
      y: arrowEnd.y - unitY * arrowHeadSize + unitX * arrowHeadSize * 0.5,
    };

    return (
      <g key={`${arrow.from}-${arrow.to}`}>
        {/* starting circle */}
        <circle cx={start.x} cy={start.y} r={circleRadius} fill={arrow.color} />
        <line
          x1={arrowStart.x}
          y1={arrowStart.y}
          x2={arrowEnd.x}
          y2={arrowEnd.y}
          stroke={arrow.color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={arrow.style === 'dotted' ? '2' : 'none'}
        />
        <polygon
          points={`${arrowEnd.x},${arrowEnd.y} ${arrowHeadLeft.x},${arrowHeadLeft.y} ${arrowHeadRight.x},${arrowHeadRight.y}`}
          fill={arrow.color}
        />
      </g>
    );
  };

  // Highlights are drawn in a separate layer under pieces (HighlightsLayer)

  const containerEvents = mode === 'annotate' ? 'pointer-events-auto' : 'pointer-events-none';
  const svgEvents = mode === 'annotate' ? 'pointer-events-auto' : 'pointer-events-none';

  return (
    <div className={`absolute inset-0 z-30 w-full h-full ${containerEvents}`}>
      <svg
        ref={svgRef}
        aria-label="annotation-layer"
        className={`absolute inset-0 w-full h-full ${svgEvents}`}
        viewBox="0 0 100 100"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {arrows.map(renderArrow)}
        {isDrawing &&
          startSquare &&
          dragPoint &&
          (() => {
            const start = getSquareCenter(startSquare);
            const end = dragPoint;
            const dx = end.x - start.x;
            const dy = end.y - start.y;
            const length = Math.sqrt(dx * dx + dy * dy) || 1;
            const ux = dx / length;
            const uy = dy / length;
            const head = 1.8;
            const circleRadius = annotateCircleRadius;
            const e = { x: end.x - ux * 2, y: end.y - uy * 2 };
            const left = {
              x: e.x - ux * head + uy * head * 0.5,
              y: e.y - uy * head - ux * head * 0.5,
            };
            const right = {
              x: e.x - ux * head - uy * head * 0.5,
              y: e.y - uy * head + ux * head * 0.5,
            };
            return (
              <g>
                <circle cx={start.x} cy={start.y} r={circleRadius} fill={annotateColor} />
                <line
                  x1={start.x + ux * circleRadius}
                  y1={start.y + uy * circleRadius}
                  x2={e.x}
                  y2={e.y}
                  stroke={annotateColor}
                  strokeWidth={annotateStroke}
                  strokeLinecap="round"
                />
                <polygon
                  points={`${e.x},${e.y} ${left.x},${left.y} ${right.x},${right.y}`}
                  fill={annotateColor}
                  opacity={0.9}
                />
              </g>
            );
          })()}
      </svg>

      {mode === 'annotate' && (
        <div className="absolute -bottom-14 left-2 text-xs text-white bg-black/70 px-2 py-1 rounded">
          Click+drag: arrow | Shift+click: highlight
        </div>
      )}
    </div>
  );
};

export default AnnotationLayer;
