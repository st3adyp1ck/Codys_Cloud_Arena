import React, { useState, useEffect } from 'react';

interface HolographicOverlayProps {
  isActive?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  lineSpacing?: number;
}

const HolographicOverlay: React.FC<HolographicOverlayProps> = ({
  isActive = false,
  primaryColor = 'rgba(0, 240, 255, 0.1)',
  secondaryColor = 'rgba(123, 66, 255, 0.1)',
  lineSpacing = 2
}) => {
  const [active, setActive] = useState(isActive);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  const overlayStyle = {
    background: `linear-gradient(135deg, 
      ${primaryColor} 0%, 
      ${secondaryColor} 50%, 
      ${primaryColor} 100%)`
  };

  const linesStyle = {
    background: `repeating-linear-gradient(
      0deg,
      transparent,
      ${primaryColor} 1px,
      transparent ${lineSpacing}px
    )`
  };

  return (
    <div className={`holographic-overlay ${active ? 'active' : ''}`} style={overlayStyle}>
      <div className="holographic-lines" style={linesStyle}></div>
    </div>
  );
};

export default HolographicOverlay;
