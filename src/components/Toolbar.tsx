'use client';
import React, { useState } from 'react';
import { useChessStore } from '@/hooks/useChessStore';
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
  } = useChessStore();
  const [fenInput, setFenInput] = useState('');
  const [showFenInput, setShowFenInput] = useState(false);

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
  };

  const handleFlip = () => {
    setOrientation(orientation === 'white' ? 'black' : 'white');
  };

  const handleFenImport = () => {
    if (fenInput.trim()) {
      importFen(fenInput.trim());
      setFenInput('');
      setShowFenInput(false);
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
  };

  const modeButton = (targetMode: Mode, label: string) => (
    <button
      type="button"
      onClick={() => handleModeChange(targetMode)}
      className={`px-3 py-2 text-sm font-medium rounded-md ${
        mode === targetMode
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div role="toolbar" aria-label="editor-toolbar" className="space-y-3">
      <div className="flex gap-2 items-center flex-wrap">
        {modeButton('setup', 'Setup')}
        {modeButton('annotate', 'Annotate')}
        {modeButton('play', 'Play')}

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <button
          type="button"
          onClick={handleFlip}
          className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          Flip ({orientation})
        </button>

        {mode === 'setup' && (
          <>
            <button
              type="button"
              onClick={clearBoard}
              className="px-3 py-2 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-md"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={setInitialPosition}
              className="px-3 py-2 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-md"
            >
              Initial
            </button>
          </>
        )}
      </div>

      <div className="flex gap-2 items-center flex-wrap">
        <button
          type="button"
          onClick={() => setShowFenInput(!showFenInput)}
          className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          Import FEN
        </button>

        <button
          type="button"
          onClick={() => handleExport('fen')}
          className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          Export FEN
        </button>

        <button
          type="button"
          onClick={() => handleExport('pgn')}
          className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          Export PGN
        </button>

        <button
          type="button"
          onClick={() => handleExport('json')}
          className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          Export JSON
        </button>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        <button
          type="button"
          onClick={handleShare}
          className="px-3 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md"
        >
          Share URL
        </button>
      </div>

      {showFenInput && (
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={fenInput}
            onChange={(e) => setFenInput(e.target.value)}
            placeholder="Paste FEN string here..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <button
            type="button"
            onClick={handleFenImport}
            className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Import
          </button>
          <button
            type="button"
            onClick={() => setShowFenInput(false)}
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
