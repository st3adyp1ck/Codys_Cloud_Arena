import React from 'react';

interface VerticalScanLineProps {
  color?: string;
  duration?: number;
  delay?: number;
  width?: number;
}

const VerticalScanLine: React.FC<VerticalScanLineProps> = ({
  color = 'rgba(0, 240, 255, 0.8)',
  duration = 8,
  delay = 0,
  width = 2
}) => {
  const style = {
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    width: `${width}px`,
    background: `linear-gradient(to bottom, 
      rgba(0, 0, 0, 0) 0%, 
      ${color} 50%, 
      rgba(0, 0, 0, 0) 100%)`,
    boxShadow: `0 0 10px ${color.replace(/[^,]+(?=\))/, '0.5')}`
  };

  return (
    <div className="vertical-scan-line" style={style} />
  );
};

export default VerticalScanLine;
