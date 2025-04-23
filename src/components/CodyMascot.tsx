import React from 'react';

interface CodyMascotProps {
  mood?: 'happy' | 'thinking' | 'battle' | 'victory' | 'defeat';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

const CodyMascot: React.FC<CodyMascotProps> = ({ 
  mood = 'happy', 
  size = 'md',
  className = '',
  animated = true
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48'
  };
  
  // Different eye styles based on mood
  const getEyes = () => {
    switch (mood) {
      case 'happy':
        return (
          <>
            <div className="absolute top-1/4 left-1/4 w-1/5 h-1/5 bg-[#00f0ff] rounded-full animate-pulse"></div>
            <div className="absolute top-1/4 right-1/4 w-1/5 h-1/5 bg-[#00f0ff] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </>
        );
      case 'thinking':
        return (
          <>
            <div className="absolute top-1/4 left-1/4 w-1/5 h-1/5 bg-[#fbbc05] rounded-full"></div>
            <div className="absolute top-1/4 right-1/4 w-1/5 h-1/5 bg-[#fbbc05] rounded-full"></div>
          </>
        );
      case 'battle':
        return (
          <>
            <div className="absolute top-1/4 left-1/4 w-1/5 h-1/5 bg-[#ff3366] rounded-full animate-pulse"></div>
            <div className="absolute top-1/4 right-1/4 w-1/5 h-1/5 bg-[#ff3366] rounded-full animate-pulse"></div>
          </>
        );
      case 'victory':
        return (
          <>
            <div className="absolute top-1/4 left-1/4 w-1/5 h-1/5 bg-[#00ff88] rounded-full animate-pulse"></div>
            <div className="absolute top-1/4 right-1/4 w-1/5 h-1/5 bg-[#00ff88] rounded-full animate-pulse"></div>
          </>
        );
      case 'defeat':
        return (
          <>
            <div className="absolute top-1/4 left-1/4 w-1/5 h-1/5 bg-[#ff3366] rounded-full"></div>
            <div className="absolute top-1/4 right-1/4 w-1/5 h-1/5 bg-[#ff3366] rounded-full"></div>
          </>
        );
      default:
        return (
          <>
            <div className="absolute top-1/4 left-1/4 w-1/5 h-1/5 bg-[#00f0ff] rounded-full"></div>
            <div className="absolute top-1/4 right-1/4 w-1/5 h-1/5 bg-[#00f0ff] rounded-full"></div>
          </>
        );
    }
  };
  
  // Different mouth styles based on mood
  const getMouth = () => {
    switch (mood) {
      case 'happy':
        return (
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-2/5 h-[2px] bg-[#00f0ff] rounded-full">
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1/2 h-[2px] bg-[#00f0ff] rounded-full"></div>
          </div>
        );
      case 'thinking':
        return (
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-1/4 h-[2px] bg-[#fbbc05] rounded-full"></div>
        );
      case 'battle':
        return (
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-2/5 h-[2px] bg-[#ff3366] rounded-full"></div>
        );
      case 'victory':
        return (
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-2/5 h-[2px] bg-[#00ff88] rounded-full">
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-[#00ff88] rounded-full"></div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-[2px] bg-[#00ff88] rounded-full"></div>
          </div>
        );
      case 'defeat':
        return (
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-2/5 h-[2px] bg-[#ff3366] rounded-full">
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3/4 h-[2px] bg-[#ff3366] rounded-full"></div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1/2 h-[2px] bg-[#ff3366] rounded-full"></div>
          </div>
        );
      default:
        return (
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-2/5 h-[2px] bg-[#00f0ff] rounded-full"></div>
        );
    }
  };
  
  // Animation class based on mood
  const getAnimation = () => {
    if (!animated) return '';
    
    switch (mood) {
      case 'happy':
        return 'animate-bounce';
      case 'thinking':
        return 'animate-pulse';
      case 'battle':
        return 'animate-pulse';
      case 'victory':
        return 'animate-bounce';
      case 'defeat':
        return 'animate-pulse';
      default:
        return '';
    }
  };
  
  return (
    <div className={`relative ${sizeClasses[size]} ${getAnimation()} ${className}`}>
      {/* Robot Head */}
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1128] to-[#1a2b57] rounded-xl border-2 border-[#00f0ff]/30 overflow-hidden">
          {/* Circuit pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-[1px] bg-[#00f0ff]"></div>
            <div className="absolute top-1/2 left-1/4 w-1/2 h-[1px] bg-[#00f0ff]"></div>
            <div className="absolute top-3/4 left-1/4 w-1/2 h-[1px] bg-[#00f0ff]"></div>
            <div className="absolute left-1/4 top-1/4 w-[1px] h-1/2 bg-[#00f0ff]"></div>
            <div className="absolute left-1/2 top-1/4 w-[1px] h-1/2 bg-[#00f0ff]"></div>
            <div className="absolute left-3/4 top-1/4 w-[1px] h-1/2 bg-[#00f0ff]"></div>
          </div>
          
          {/* Eyes */}
          {getEyes()}
          
          {/* Mouth */}
          {getMouth()}
          
          {/* Antenna */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-3 bg-[#00f0ff]/70 rounded-full"></div>
            <div className="w-2 h-2 bg-[#00f0ff] rounded-full -mt-1 mx-auto animate-pulse"></div>
          </div>
          
          {/* Ear pieces */}
          <div className="absolute top-1/3 -left-1 w-1 h-1/3 bg-[#00f0ff]/30 rounded-l-lg"></div>
          <div className="absolute top-1/3 -right-1 w-1 h-1/3 bg-[#00f0ff]/30 rounded-r-lg"></div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-[#00f0ff]/5 rounded-xl animate-pulse" style={{ animationDuration: '3s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default CodyMascot;
