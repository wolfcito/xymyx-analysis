'use client';
import React from 'react';
import Image from 'next/image';

const RulesSection: React.FC = () => {
  const rules = ['SIMULTANEIDAD', 'COLISIÓN', 'ABSORCIÓN', 'PIEZA CONGELADA'];

  return (
    <div className="flex-1">
      <div className="mb-3">
        <h3 className="text-[var(--neon-green)] text-sm font-bold tracking-wider">REGLAS</h3>
      </div>
      <div className="space-y-2">
        {rules.map((rule, index) => (
          <div key={rule} className="relative h-8">
            <Image
              src="/scene/009_background-btn1.png"
              alt="Button background"
              fill
              className="object-cover"
            />
            <button className="relative z-10 w-full py-2 px-3 text-left text-white text-xs hover:text-[var(--neon-green)] transition-colors">
              <span className="mr-8 text-[var(--neon-green)]">{index + 1}</span>
              {rule}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RulesSection;
