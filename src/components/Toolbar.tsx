'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useXymyxStore } from '@/hooks/useXymyxStore';
import type { Mode } from '@/types';

const Toolbar: React.FC = () => {
  const {
    mode,
    setMode,
    setOrientation,
    orientation,
    clearBoard,
    setInitialPosition,
    importFen,
    exportFen,
    exportPgn,
    exportJson,
    shareUrl,
  } = useXymyxStore();
  const [isOpen, setIsOpen] = useState(false);
  const [fenInput, setFenInput] = useState('');
  const [showFenInput, setShowFenInput] = useState(false);

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setIsOpen(false);
  };

  const handleFlip = () => {
    setOrientation(orientation === 'white' ? 'black' : 'white');
    setIsOpen(false);
  };

  const handleFenImport = () => {
    if (fenInput.trim()) {
      importFen(fenInput.trim());
      setFenInput('');
      setShowFenInput(false);
      setIsOpen(false);
    }
  };

  const handleShare = async () => {
    const url = shareUrl();
    if (url) {
      try {
        await navigator.clipboard.writeText(url);
        alert('Share URL copied to clipboard!');
      } catch {
        prompt('Copy this URL to share:', url);
      }
    }
    setIsOpen(false);
  };

  const handleExport = (type: 'fen' | 'pgn' | 'json') => {
    let content = '';
    let filename = '';

    switch (type) {
      case 'fen':
        content = exportFen();
        filename = 'position.fen';
        break;
      case 'pgn':
        content = exportPgn();
        filename = 'game.pgn';
        break;
      case 'json':
        content = exportJson();
        filename = 'analysis.json';
        break;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const getModeIcon = (currentMode: Mode) => {
    switch (currentMode) {
      case 'setup':
        return '⚙️';
      case 'annotate':
        return '✏️';
      case 'play':
        return '▶️';
      default:
        return '⚙️';
    }
  };

  const getModeLabel = (currentMode: Mode) => {
    switch (currentMode) {
      case 'setup':
        return 'Setup';
      case 'annotate':
        return 'Annotate';
      case 'play':
        return 'Play';
      default:
        return 'Setup';
    }
  };

  return (
    <div className="relative">
      {/* Main Dropdown Button */}
      <div className="panel-button">
        <Image
          src="/scene/010_background-btn2.png"
          alt="Button background"
          fill
          className="panel-button-bg"
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`panel-button-text flex items-center justify-between ${
            mode === 'play' ? 'text-[var(--neon-green)]' : ''
          }`}
        >
          <div className="flex items-center space-x-2">
            <span>{getModeIcon(mode)}</span>
            <span>{getModeLabel(mode)}</span>
          </div>
          <svg
            className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-[var(--dark-gray)] border border-[var(--neon-green)] rounded-lg shadow-lg z-50 neon-glow">
          <div className="p-2 space-y-1">
            {/* Mode Selection */}
            <div className="px-3 py-2 text-xs font-semibold text-[var(--neon-green)] uppercase tracking-wide border-b border-[var(--light-gray)]">
              Mode
            </div>

            {(['setup', 'annotate', 'play'] as Mode[]).map((modeOption) => (
              <div key={modeOption} className="panel-button">
                <Image
                  src="/scene/010_background-btn2.png"
                  alt="Button background"
                  fill
                  className="panel-button-bg"
                />
                <button
                  onClick={() => handleModeChange(modeOption)}
                  className={`panel-button-text flex items-center justify-between ${
                    mode === modeOption ? 'text-[var(--neon-green)]' : ''
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{getModeIcon(modeOption)}</span>
                    <span>{getModeLabel(modeOption)}</span>
                  </div>
                  {mode === modeOption && <span className="text-xs">✓</span>}
                </button>
              </div>
            ))}

            {/* Separator */}
            <div className="h-px bg-[var(--light-gray)] my-2"></div>

            {/* Board Controls */}
            <div className="px-3 py-2 text-xs font-semibold text-[var(--neon-green)] uppercase tracking-wide border-b border-[var(--light-gray)]">
              Board
            </div>

            <button
              onClick={handleFlip}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-white rounded hover:bg-[var(--medium-gray)] hover:text-[var(--neon-green)] transition-all duration-200"
            >
              <span>🔄</span>
              <span>Flip ({orientation})</span>
            </button>

            {mode === 'setup' && (
              <>
                <button
                  onClick={() => {
                    clearBoard();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-white rounded hover:bg-red-600 hover:text-white transition-all duration-200"
                >
                  <span>🗑️</span>
                  <span>Clear Board</span>
                </button>
                <button
                  onClick={() => {
                    setInitialPosition();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-white rounded hover:bg-[var(--neon-green)] hover:text-black transition-all duration-200"
                >
                  <span>🏁</span>
                  <span>Initial Position</span>
                </button>
              </>
            )}

            {/* Separator */}
            <div className="h-px bg-[var(--light-gray)] my-2"></div>

            {/* Import/Export */}
            <div className="px-3 py-2 text-xs font-semibold text-[var(--neon-green)] uppercase tracking-wide border-b border-[var(--light-gray)]">
              Data
            </div>

            <button
              onClick={() => setShowFenInput(!showFenInput)}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-white rounded hover:bg-[var(--medium-gray)] hover:text-[var(--neon-green)] transition-all duration-200"
            >
              <span>📥</span>
              <span>Import FEN</span>
            </button>

            <button
              onClick={() => handleExport('fen')}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-white rounded hover:bg-[var(--medium-gray)] hover:text-[var(--neon-green)] transition-all duration-200"
            >
              <span>📤</span>
              <span>Export FEN</span>
            </button>

            <button
              onClick={() => handleExport('pgn')}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-white rounded hover:bg-[var(--medium-gray)] hover:text-[var(--neon-green)] transition-all duration-200"
            >
              <span>📤</span>
              <span>Export PGN</span>
            </button>

            <button
              onClick={() => handleExport('json')}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-white rounded hover:bg-[var(--medium-gray)] hover:text-[var(--neon-green)] transition-all duration-200"
            >
              <span>📤</span>
              <span>Export JSON</span>
            </button>

            {/* Separator */}
            <div className="h-px bg-[var(--light-gray)] my-2"></div>

            {/* Share */}
            <button
              onClick={handleShare}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-white rounded hover:bg-[var(--accent-blue)] hover:text-white transition-all duration-200"
            >
              <span>🔗</span>
              <span>Share URL</span>
            </button>
          </div>
        </div>
      )}

      {/* FEN Input Modal */}
      {showFenInput && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-[var(--dark-gray)] border border-[var(--neon-green)] rounded-lg shadow-lg z-50 neon-glow p-4">
          <div className="space-y-3">
            <div className="text-sm font-semibold text-[var(--neon-green)]">
              Import FEN Position
            </div>
            <input
              type="text"
              value={fenInput}
              onChange={(e) => setFenInput(e.target.value)}
              placeholder="Paste FEN string here..."
              className="w-full px-3 py-2 bg-[var(--background)] border border-[var(--light-gray)] rounded text-sm text-white placeholder-[var(--light-gray)] focus:outline-none focus:border-[var(--neon-green)]"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleFenImport}
                className="flex-1 px-3 py-2 text-sm bg-[var(--neon-green)] text-black border border-[var(--neon-green)] rounded hover:bg-[var(--neon-green-dark)] transition-all duration-200"
              >
                Import
              </button>
              <button
                onClick={() => {
                  setShowFenInput(false);
                  setFenInput('');
                }}
                className="flex-1 px-3 py-2 text-sm bg-[var(--medium-gray)] text-white border border-[var(--light-gray)] rounded hover:border-[var(--neon-green)] hover:text-[var(--neon-green)] transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  );
};

export default Toolbar;
