import React from 'react';

const RenderIcon = ({ iconName, toolName }) => (
  <div className="flex-1 flex justify-center">
    <div className="ml3 mr3 flex relative flex-wrap icon-wrapper mb3">
      <div className="skill-icon" style={{ backgroundImage: `url('/images/${iconName}.png')` }} />
      <div className={`w-100 icon-text justify-center ${iconName} f3 flex tc items-center justify-center`}>{toolName}</div>
    </div>
  </div>
);

export default RenderIcon;
