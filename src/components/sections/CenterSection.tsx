'use client';
import React from 'react';
import Image from 'next/image';
import Board from '@/components/Board';
import AnnotationLayer from '@/components/AnnotationLayer';
import HighlightsLayer from '@/components/HighlightsLayer';

const CenterSection: React.FC = () => {
  return (
    <div className="flex-1 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/scene/004_tablero.png"
          alt="Board background"
          width={510}
          height={510}
          className="board-background-image object-contain"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="board-container relative">
          {/* Board letters overlay - scales with board - Behind everything */}
          <div className="absolute inset-0 z-10 pointer-events-none -mx-24 -my-12">
            <Image
              src="/scene/003_letras-borde-tablero.png"
              alt="Board letters"
              fill
              className="object-contain pointer-events-none"
            />
          </div>
          <div className="absolute inset-0 z-10 pointer-events-none">
            <HighlightsLayer />
          </div>
          <div className="relative z-20">
            <Board />
          </div>
          <AnnotationLayer />
        </div>
      </div>
    </div>
  );
};

export default CenterSection;
