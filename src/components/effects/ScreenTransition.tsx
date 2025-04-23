import React, { useState, useEffect } from 'react';

interface ScreenTransitionProps {
  isActive: boolean;
  message?: string;
  progress?: number;
  onTransitionComplete?: () => void;
  duration?: number;
}

const ScreenTransition: React.FC<ScreenTransitionProps> = ({
  isActive,
  message = 'Loading...',
  progress = 0,
  onTransitionComplete,
  duration = 1000
}) => {
  const [active, setActive] = useState(isActive);
  const [loadingProgress, setLoadingProgress] = useState(progress);

  useEffect(() => {
    setActive(isActive);
    
    if (isActive) {
      // Reset progress when becoming active
      setLoadingProgress(0);
      
      // Animate progress
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min(100, (elapsed / duration) * 100);
        setLoadingProgress(newProgress);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Call completion callback after a small delay
          setTimeout(() => {
            if (onTransitionComplete) {
              onTransitionComplete();
            }
          }, 200);
        }
      }, 16);
      
      return () => clearInterval(interval);
    }
  }, [isActive, duration, onTransitionComplete]);

  return (
    <div className={`screen-transition ${active ? 'active' : ''}`}>
      <div className="screen-transition-content">
        <div className="text-2xl font-['Orbitron'] mb-2">{message}</div>
        <div className="loading-bar">
          <div 
            className="loading-bar-fill" 
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <div className="text-sm">{Math.round(loadingProgress)}%</div>
      </div>
    </div>
  );
};

export default ScreenTransition;
