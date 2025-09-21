'use client';
import React, { useState } from 'react';
import MoveList from './MoveList';

const StreamingSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'moves' | 'chat' | 'analysis'>('moves');

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

            {/* Video Stream Section */}
            <div className="p-4 border-t border-[var(--light-gray)]">
              <div className="bg-[var(--background)] border border-[var(--light-gray)] rounded h-32 flex items-center justify-center">
                <span className="text-[var(--light-gray)] text-sm">video stream</span>
              </div>
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
    </div>
  );
};

export default StreamingSidebar;
