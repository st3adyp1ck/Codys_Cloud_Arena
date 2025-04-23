import React from 'react';

interface CornerDecorationsProps {
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

const CornerDecorations: React.FC<CornerDecorationsProps> = ({
  size = 100,
  primaryColor = 'rgba(0, 240, 255, 0.7)',
  secondaryColor = 'rgba(123, 66, 255, 0.7)'
}) => {
  const cornerStyle = {
    width: `${size}px`,
    height: `${size}px`
  };

  const topLeftStyle = {
    ...cornerStyle,
    borderTop: `2px solid ${primaryColor}`,
    borderLeft: `2px solid ${primaryColor}`
  };

  const topRightStyle = {
    ...cornerStyle,
    borderTop: `2px solid ${secondaryColor}`,
    borderRight: `2px solid ${secondaryColor}`
  };

  const bottomLeftStyle = {
    ...cornerStyle,
    borderBottom: `2px solid ${secondaryColor}`,
    borderLeft: `2px solid ${secondaryColor}`
  };

  const bottomRightStyle = {
    ...cornerStyle,
    borderBottom: `2px solid ${primaryColor}`,
    borderRight: `2px solid ${primaryColor}`
  };

  return (
    <>
      <div className="corner-decoration corner-decoration-top-left" style={topLeftStyle} />
      <div className="corner-decoration corner-decoration-top-right" style={topRightStyle} />
      <div className="corner-decoration corner-decoration-bottom-left" style={bottomLeftStyle} />
      <div className="corner-decoration corner-decoration-bottom-right" style={bottomRightStyle} />
    </>
  );
};

export default CornerDecorations;
