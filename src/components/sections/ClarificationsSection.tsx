'use client';
import React from 'react';
import Image from 'next/image';

const ClarificationsSection: React.FC = () => {
  return (
    <div className="relative h-8">
      <Image
        src="/scene/010_background-btn2.png"
        alt="Button background"
        fill
        className="object-cover"
      />
      <button className="relative z-10 w-full py-2 px-3 text-left text-white text-xs hover:text-[var(--neon-green)] transition-colors">
        ACLARACIONES
      </button>
    </div>
  );
};

export default ClarificationsSection;
