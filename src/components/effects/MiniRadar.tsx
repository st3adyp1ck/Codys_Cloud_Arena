import React from 'react';

interface MiniRadarProps {
  size?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color?: string;
}

const MiniRadar: React.FC<MiniRadarProps> = ({
  size = 60,
  position = 'bottom-right',
  color = 'rgba(0, 240, 255, 0.7)'
}) => {
  // Calculate position styles
  const getPositionStyle = () => {
    switch (position) {
      case 'top-left':
        return { top: '20px', left: '20px' };
      case 'top-right':
        return { top: '20px', right: '20px' };
      case 'bottom-left':
        return { bottom: '20px', left: '20px' };
      case 'bottom-right':
      default:
        return { bottom: '20px', right: '20px' };
    }
  };

  const radarStyle = {
    ...getPositionStyle(),
    width: `${size}px`,
    height: `${size}px`,
    borderColor: color
  };

  const sweepStyle = {
    backgroundColor: color
  };

  return (
    <div className="mini-radar" style={radarStyle}>
      <div className="radar-sweep" style={sweepStyle}></div>
      <div className="radar-ping"></div>
      <div className="radar-ping" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default MiniRadar;
