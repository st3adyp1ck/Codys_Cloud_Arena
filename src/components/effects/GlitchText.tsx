import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchInterval?: number;
  glitchDuration?: number;
  color?: string;
  children?: React.ReactNode;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = '',
  glitchInterval = 5000,
  glitchDuration = 2000,
  color = '#00f0ff',
  children
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const displayText = text || (children ? String(children) : '');

  useEffect(() => {
    // Start glitch effect at random intervals
    const startGlitchInterval = setInterval(() => {
      setIsGlitching(true);
      
      // Stop glitch effect after duration
      const stopGlitchTimeout = setTimeout(() => {
        setIsGlitching(false);
      }, glitchDuration);
      
      return () => clearTimeout(stopGlitchTimeout);
    }, glitchInterval);
    
    return () => clearInterval(startGlitchInterval);
  }, [glitchDuration, glitchInterval]);

  return (
    <span 
      className={`${isGlitching ? 'text-glitch' : ''} ${className}`}
      data-text={displayText}
      style={{ color: isGlitching ? color : 'inherit' }}
    >
      {displayText}
    </span>
  );
};

export default GlitchText;
