'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useXymyxStore } from '@/hooks/useXymyxStore';
import PieceTray from '@/components/PieceTray';
import Toolbar from '@/components/Toolbar';
import AnnotatePanel from '@/components/AnnotatePanel';
import MoveList from '@/components/MoveList';
import StreamPreview from '@/components/StreamPreview';

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
            <div className="flex-1 flex flex-col space-y-4">
              {/* 1. Video Streaming Section */}
              <div className="bg-black/30 rounded p-3">
                <StreamPreview />
              </div>

              {/* 2. Representative Image Section */}
              <div className="bg-black/30 rounded p-3 flex-1">
                <div className="relative w-full aspect-[3/2] rounded overflow-hidden">
                  <Image
                    src="/scene/005_fondo-panel.png"
                    alt="Scene representation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[var(--neon-green)]/10"></div>
                  <div className="absolute bottom-1 right-1 text-[var(--neon-green)] text-[10px] font-mono">
                    XYMYX
                  </div>
                </div>
              </div>

              {/* 3. Text Information Section */}
              <div className="bg-black/30 rounded p-3">
                <h4 className="text-[var(--neon-green)] text-xs font-bold mb-2 tracking-wider">
                  INFO
                </h4>
                <div className="text-white text-xs leading-relaxed space-y-2">
                  <p>
                    NUEVA PIEZA AÑADIDA ESPECIAL EN FORMA DE ESPADA QUE SOLO EXISTE EN EL TABLERO
                  </p>
                  <div className="border-t border-white/10 pt-2">
                    <div className="flex justify-between text-[10px] text-white/70">
                      <span>STATUS:</span>
                      <span className="text-[var(--neon-green)]">ACTIVE</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-white/70">
                      <span>MODE:</span>
                      <span className="text-[var(--neon-green)] uppercase">{mode}</span>
                    </div>
                  </div>
                </div>
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
