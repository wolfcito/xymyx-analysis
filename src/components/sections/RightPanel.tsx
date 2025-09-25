'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useXymyxStore } from '@/hooks/useXymyxStore';
import PieceTray from '@/components/PieceTray';
import Toolbar from '@/components/Toolbar';
import AnnotatePanel from '@/components/AnnotatePanel';
import MoveList from '@/components/MoveList';

const RightPanel: React.FC = () => {
  const { mode } = useXymyxStore();
  const [activeTab, setActiveTab] = useState<'info' | 'tools'>('info');

  return (
    <div className="w-80 flex flex-col h-full">
      <div className="relative flex-1">
        <Image
          src="/scene/005_fondo-panel.png"
          alt="Panel background"
          fill
          className="object-cover rounded-lg"
        />
        <div className="relative z-10 flex flex-col h-full p-4">
          {/* Tab Switcher */}
          <div className="flex mb-4 space-x-2">
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-2 px-3 text-xs rounded transition-colors ${
                activeTab === 'info'
                  ? 'bg-[var(--neon-green)] text-black'
                  : 'bg-black/30 text-white hover:text-[var(--neon-green)]'
              }`}
            >
              INFO
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`flex-1 py-2 px-3 text-xs rounded transition-colors ${
                activeTab === 'tools'
                  ? 'bg-[var(--neon-green)] text-black'
                  : 'bg-black/30 text-white hover:text-[var(--neon-green)]'
              }`}
            >
              TOOLS
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'info' ? (
            <div className="flex-1 flex flex-col">
              {/* Piece display area */}
              <div className="flex-1 flex flex-col items-center justify-center mb-4">
                <div className="w-32 h-32 mb-4 flex items-center justify-center relative">
                  <Image
                    src="/pieces/png/xymyx/rey-dorado.png"
                    alt="Selected piece"
                    width={128}
                    height={128}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Info text area */}
              <div className="bg-black/30 rounded p-3 text-white text-xs leading-relaxed">
                <p>NUEVA PIEZA AÑADIDA ESPECIAL EN FORMA DE ESPADA QUE SOLO EXISTE EN EL TABLERO</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-4">
              {/* Mode selector */}
              <div className="mb-4">
                <Toolbar />
              </div>

              {/* Mode-specific tools */}
              {mode === 'setup' && <PieceTray />}
              {mode === 'annotate' && <AnnotatePanel />}
              {mode === 'play' && (
                <div className="space-y-4">
                  <MoveList />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
