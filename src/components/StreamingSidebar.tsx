'use client';
import React, { useState } from 'react';
import MoveList from './MoveList';
import PieceTray from './PieceTray';
import { useChessStore } from '@/hooks/useChessStore';
import type { Mode } from '@/types';
import StreamPreview from './StreamPreview';

const StreamingSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'moves' | 'chat' | 'analysis'>('moves');
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
  const [isOpen, setIsOpen] = useState(false);
  const [fenInput, setFenInput] = useState('');
  const [showFenInput, setShowFenInput] = useState(false);
  const [squareTransparency, setSquareTransparency] = useState(0);

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
    }
  };

  const handleShare = () => {
    shareUrl();
    setIsOpen(false);
  };

  const handleTransparencyChange = (value: number) => {
    setSquareTransparency(value);
    document.documentElement.style.setProperty('--square-transparency', value.toString());
  };

  const handleExport = (type: 'fen' | 'pgn' | 'json') => {
    switch (type) {
      case 'fen':
        exportFen();
        break;
      case 'pgn':
        exportPgn();
        break;
      case 'json':
        exportJson();
        break;
    }
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

  const chatMessages = [
    { user: 'xymyxmaster99', message: 'Great opening!', role: 'mod' },
    { user: 'pawnpusher', message: 'What about Nf3?', role: 'user' },
    { user: 'grandmaster', message: 'Stockfish suggests e4', role: 'vip' },
    { user: 'xymyxnoob', message: 'I dont understand this position', role: 'user' },
    { user: 'analyst_pro', message: 'Black has a slight advantage', role: 'mod' },
    { user: 'tactician', message: 'Look at the pin on the knight', role: 'user' },
    { user: 'opening_expert', message: 'This is the Sicilian Defense', role: 'vip' },
    { user: 'endgame_king', message: 'White should castle soon', role: 'user' },
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'mod':
        return '👑';
      case 'vip':
        return '⭐';
      default:
        return '👤';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'mod':
        return 'text-yellow-400';
      case 'vip':
        return 'text-purple-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="sidebar-frame h-full flex flex-col">
      {/* Video Stream Section */}
      <div className="m-2">
        <StreamPreview />
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-[var(--neon-green)]">
        {[
          { id: 'moves', label: 'MOVES', icon: '♟️' },
          { id: 'chat', label: 'CHAT', icon: '💬' },
          { id: 'analysis', label: 'ANALYSIS', icon: '📊' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'moves' | 'chat' | 'analysis')}
            className={`flex-1 py-3 px-4 text-sm font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-[var(--neon-green)] text-black'
                : 'text-[var(--neon-green)] hover:bg-[var(--medium-gray)]'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'moves' && (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-[var(--light-gray)]">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">
                Game Moves
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto">
              <MoveList />
            </div>

            {/* Piece Tray Section */}
            <div className="p-4 border-t border-[var(--light-gray)]">
              <PieceTray />
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-[var(--light-gray)]">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">
                Live Chat
              </h3>
              <div className="text-xs text-[var(--light-gray)] mt-1">127 viewers</div>
            </div>
            <div className="flex-1 overflow-y-auto chat-window">
              {chatMessages.map((msg, index) => (
                <div key={index} className="chat-message">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs">{getRoleIcon(msg.role)}</span>
                    <span className={`text-sm font-medium ${getRoleColor(msg.role)}`}>
                      {msg.user}:
                    </span>
                    <span className="text-sm text-white">{msg.message}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-[var(--light-gray)]">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-[var(--dark-gray)] border border-[var(--light-gray)] rounded px-3 py-2 text-sm text-white placeholder-[var(--light-gray)] focus:outline-none focus:border-[var(--neon-green)]"
                />
                <button className="bg-[var(--neon-green)] text-black px-4 py-2 rounded text-sm font-semibold hover:bg-[var(--neon-green-dark)] transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-[var(--light-gray)]">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide">
                Position Analysis
              </h3>
            </div>
            <div className="flex-1 p-4 space-y-4">
              <div className="stats-panel">
                <div className="text-xs text-[var(--light-gray)] uppercase tracking-wide mb-2">
                  Engine Evaluation
                </div>
                <div className="text-2xl font-bold text-white">+0.3</div>
                <div className="text-xs text-[var(--light-gray)]">White has slight advantage</div>
              </div>

              <div className="stats-panel">
                <div className="text-xs text-[var(--light-gray)] uppercase tracking-wide mb-2">
                  Best Line
                </div>
                <div className="text-sm text-white font-mono">1. e4 e5 2. Nf3 Nc6 3. Bb5</div>
              </div>

              <div className="stats-panel">
                <div className="text-xs text-[var(--light-gray)] uppercase tracking-wide mb-2">
                  Depth
                </div>
                <div className="text-lg font-bold text-[var(--neon-green)]">18</div>
              </div>

              <div className="stats-panel">
                <div className="text-xs text-[var(--light-gray)] uppercase tracking-wide mb-2">
                  Time
                </div>
                <div className="text-sm text-white">00:05:23</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls Panel - Bottom */}
      <div className="border-t border-[var(--neon-green)] p-4">
        <div className="relative">
          {/* Main Dropdown Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-3 text-sm font-semibold rounded border transition-all duration-200 ${
              mode === 'play'
                ? 'bg-[var(--neon-green)] text-black border-[var(--neon-green)] neon-glow'
                : 'bg-[var(--medium-gray)] text-white border-[var(--light-gray)] hover:border-[var(--neon-green)] hover:text-[var(--neon-green)]'
            }`}
          >
            <span>{getModeIcon(mode)}</span>
            <span>{getModeLabel(mode)}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-[var(--dark-gray)] border border-[var(--neon-green)] rounded-lg shadow-lg z-50 neon-glow">
              <div className="p-2 space-y-1">
                {/* Mode Selection */}
                <div className="px-3 py-2 text-xs font-semibold text-[var(--neon-green)] uppercase tracking-wide border-b border-[var(--light-gray)]">
                  Mode
                </div>
                {(['setup', 'annotate', 'play'] as Mode[]).map((modeOption) => (
                  <button
                    key={modeOption}
                    onClick={() => handleModeChange(modeOption)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded transition-all duration-200 ${mode === modeOption ? 'bg-[var(--neon-green)] text-black' : 'text-white hover:bg-[var(--medium-gray)] hover:text-[var(--neon-green)]'}`}
                  >
                    <span>{getModeIcon(modeOption)}</span>
                    <span>{getModeLabel(modeOption)}</span>
                    {mode === modeOption && <span className="ml-auto text-xs">✓</span>}
                  </button>
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
                <div className="px-3 py-2">
                  <div className="text-xs text-[var(--light-gray)] mb-2">Square Transparency</div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleTransparencyChange(0)}
                      className={`flex-1 px-2 py-1 text-xs rounded transition-all duration-200 ${
                        squareTransparency === 0
                          ? 'bg-[var(--neon-green)] text-black'
                          : 'bg-[var(--medium-gray)] text-white hover:bg-[var(--light-gray)]'
                      }`}
                    >
                      Transparent
                    </button>
                    <button
                      onClick={() => handleTransparencyChange(1)}
                      className={`flex-1 px-2 py-1 text-xs rounded transition-all duration-200 ${
                        squareTransparency === 1
                          ? 'bg-[var(--neon-green)] text-black'
                          : 'bg-[var(--medium-gray)] text-white hover:bg-[var(--light-gray)]'
                      }`}
                    >
                      Opaque
                    </button>
                  </div>
                </div>
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
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-[var(--dark-gray)] border border-[var(--neon-green)] rounded-lg shadow-lg z-50 neon-glow p-4">
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
      </div>
    </div>
  );
};

export default StreamingSidebar;
