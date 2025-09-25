'use client';
import React from 'react';
import Image from 'next/image';

interface BottomDockProps {
  visible?: boolean;
}

const BottomDock: React.FC<BottomDockProps> = ({ visible = true }) => {
  if (!visible) return null;

  return (
    <div className="h-20 flex gap-4 mt-4">
      {[1, 2, 3, 4].map((index) => (
        <div key={index} className="flex-1 relative">
          <Image
            src={
              index % 2 === 1 ? '/scene/007_background-box.png' : '/scene/008_background-box2.png'
            }
            alt={`Dock section ${index}`}
            fill
            className="object-cover rounded"
          />
          <div className="relative z-10 h-full flex items-center justify-center">
            {/* Content for each dock section can be added here */}
            <span className="text-white/50 text-xs">Section {index}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BottomDock;
