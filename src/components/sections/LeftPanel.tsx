'use client';
import React from 'react';
import RulesSection from './RulesSection';
import ClarificationsSection from './ClarificationsSection';
import RareSection from './RareSection';

const LeftPanel: React.FC = () => {
  return (
    <div className="w-64 flex flex-col h-full">
      <div className="relative flex-1">
        <div className="relative z-10 flex flex-col h-full p-4 space-y-4">
          <RulesSection />
          <ClarificationsSection />
          <RareSection />
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
