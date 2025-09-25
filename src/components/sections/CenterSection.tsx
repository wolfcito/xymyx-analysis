'use client';
import React from 'react';
import Image from 'next/image';
import Board from '@/components/Board';
import AnnotationLayer from '@/components/AnnotationLayer';
import HighlightsLayer from '@/components/HighlightsLayer';

const CenterSection: React.FC = () => {
  return (
    <div className="flex-1 relative">
      <Image src="/scene/004_tablero.png" alt="Board background" fill className="object-contain" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative aspect-square w-full h-full max-w-[min(100%,70vh)] max-h-[min(100%,70vh)]">
          <div className="absolute inset-0 z-10 pointer-events-none">
            <HighlightsLayer />
          </div>
          <div className="relative z-20">
            <Board />
          </div>
          <AnnotationLayer />
        </div>
      </div>
      {/* Board letters overlay */}
      <Image
        src="/scene/003_letras-borde-tablero.png"
        alt="Board letters"
        fill
        className="object-contain pointer-events-none z-25"
      />
    </div>
  );
};

export default CenterSection;
