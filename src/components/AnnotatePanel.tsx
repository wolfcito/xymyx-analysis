'use client';
import React from 'react';
import { useChessStore } from '@/hooks/useChessStore';

const AnnotatePanel: React.FC = () => {
  const { clearArrows, clearHighlights, clearLabels } = useChessStore();

  return (
    <div className="space-y-3">
      <div className="text-xs text-[var(--light-gray)]">
        Modo Annotate activo. Usa el panel de color flotante para seleccionar color.
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

      <div className="text-xs text-[var(--light-gray)]">
        Consejos: Click+drag dibuja flecha; Shift+click resalta casilla.
      </div>
    </div>
  );
};

export default AnnotatePanel;
