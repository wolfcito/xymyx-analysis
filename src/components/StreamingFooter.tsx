'use client';
import React from 'react';

const StreamingFooter: React.FC = () => {
  return (
    <footer className="streaming-footer geometric-bg h-20 flex items-center justify-center px-6">
      <div className="flex items-center space-x-8">
        {/* Last Move */}
        <div className="stats-panel flex items-center space-x-3 min-w-[200px]">
          <div className="w-10 h-10 bg-[var(--neon-green)] rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-[var(--light-gray)] uppercase tracking-wide">
              LAST MOVE
            </div>
            <div className="text-white font-semibold">e4</div>
          </div>
        </div>

        {/* Game Status */}
        <div className="stats-panel flex items-center space-x-3 min-w-[200px]">
          <div className="w-10 h-10 bg-[var(--accent-blue)] rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-[var(--light-gray)] uppercase tracking-wide">STATUS</div>
            <div className="text-white font-semibold">In Progress</div>
          </div>
        </div>

        {/* Best Move */}
        <div className="stats-panel flex items-center space-x-3 min-w-[200px]">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--neon-green)] to-[var(--neon-green-dark)] rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 14l5-5 5 5z" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-[var(--light-gray)] uppercase tracking-wide">
              BEST MOVE
            </div>
            <div className="text-white font-semibold">Nf3</div>
          </div>
        </div>

        {/* Evaluation */}
        <div className="stats-panel flex items-center space-x-3 min-w-[200px]">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--accent-blue)] to-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-[var(--light-gray)] uppercase tracking-wide">
              EVALUATION
            </div>
            <div className="text-white font-semibold">+0.3</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StreamingFooter;
