'use client';
import React from 'react';
import Image from 'next/image';

const TitleHeader: React.FC = () => {
  return (
    <div className="w-full h-16 flex items-center justify-center relative">
      <Image
        src="/scene/006_titulo-scene.png"
        alt="XYMYX Title"
        width={800}
        height={64}
        className="object-contain max-w-full h-full"
        priority
      />
    </div>
  );
};

export default TitleHeader;
