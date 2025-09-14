import React from 'react';

const Toolbar: React.FC = () => {
  const metricsPanel = () => <span aria-label="metrics">M</span>;
  return (
    <div role="toolbar" aria-label="editor-toolbar">
      <button type="button">Setup</button>
      <button type="button">Annotate</button>
      <button type="button">Play</button>
      {metricsPanel()}
    </div>
  );
};

export default Toolbar;

