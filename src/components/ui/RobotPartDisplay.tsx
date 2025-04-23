import React from 'react';
import { RobotPart } from '../../types';

interface RobotPartDisplayProps {
  part: RobotPart;
  selected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showStats?: boolean;
}

const RobotPartDisplay: React.FC<RobotPartDisplayProps> = ({
  part,
  selected = false,
  onClick,
  size = 'md',
  showStats = true
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'p-2 text-xs',
    md: 'p-3 text-sm',
    lg: 'p-4 text-base'
  };
  
  // Get color based on part type
  const getTypeColor = () => {
    switch (part.type) {
      case 'head': return 'from-[#00f0ff] to-[#00a2b3]';
      case 'body': return 'from-[#7b42ff] to-[#6930c3]';
      case 'arms': return 'from-[#ff3366] to-[#c9184a]';
      case 'legs': return 'from-[#00ff88] to-[#0a9396]';
      default: return 'from-[#00f0ff] to-[#00a2b3]';
    }
  };
  
  // Get icon based on part type
  const getTypeIcon = () => {
    switch (part.type) {
      case 'head': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="8" cy="10" r="1"></circle>
          <circle cx="16" cy="10" r="1"></circle>
          <path d="M9 16h6"></path>
        </svg>
      );
      case 'body': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="4" width="12" height="16" rx="2"></rect>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="10" y1="16" x2="14" y2="16"></line>
        </svg>
      );
      case 'arms': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 12h12"></path>
          <path d="M6 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
          <path d="M18 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
          <path d="M6 12v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6"></path>
        </svg>
      );
      case 'legs': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <path d="M8 6h8"></path>
          <path d="M8 6v14"></path>
          <path d="M16 6v14"></path>
          <path d="M5 18h6"></path>
          <path d="M13 18h6"></path>
        </svg>
      );
      default: return null;
    }
  };
  
  return (
    <div 
      className={`
        relative bg-[#0a1128]/80 border rounded-lg overflow-hidden transition-all duration-300
        ${selected ? 'border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'border-[#00f0ff]/20 hover:border-[#00f0ff]/50'}
        ${onClick ? 'cursor-pointer hover:-translate-y-1' : ''}
        ${sizeClasses[size]}
      `}
      onClick={onClick}
    >
      {/* Background circuit pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00f0ff]"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#00f0ff]"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#00f0ff]"></div>
        <div className="absolute left-0 top-0 w-[1px] h-full bg-[#00f0ff]"></div>
        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#00f0ff]"></div>
        <div className="absolute right-0 top-0 w-[1px] h-full bg-[#00f0ff]"></div>
      </div>
      
      {/* Selected indicator */}
      {selected && (
        <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#00f0ff] animate-pulse z-10"></div>
      )}
      
      {/* Part header */}
      <div className="flex items-center mb-2">
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getTypeColor()} flex items-center justify-center text-[#0a1128] mr-2`}>
          {getTypeIcon()}
        </div>
        <div>
          <h4 className="font-['Orbitron'] font-bold text-[#00f0ff] leading-tight">{part.name}</h4>
          <p className="text-xs text-[#e9f1f7]/70 leading-tight">{part.type.toUpperCase()}</p>
        </div>
      </div>
      
      {/* Cloud service */}
      <div className="mb-3 flex items-center">
        <div className="text-xs text-[#e9f1f7]/70 bg-[#1a2b57]/50 px-2 py-1 rounded-full inline-flex items-center">
          <span className="mr-1">Powered by</span>
          <span className="font-semibold text-[#00f0ff]">{part.cloudService.name}</span>
        </div>
      </div>
      
      {/* Description */}
      <p className="text-xs text-[#e9f1f7] mb-3 line-clamp-2">{part.description}</p>
      
      {/* Stats */}
      {showStats && (
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="bg-[#0a1128]/50 rounded p-1">
            <div className="text-xs text-[#ff3366] font-['Rajdhani'] font-semibold">POWER</div>
            <div className="text-xs text-[#e9f1f7] font-['Orbitron']">+{part.power}</div>
          </div>
          <div className="bg-[#0a1128]/50 rounded p-1">
            <div className="text-xs text-[#00ff88] font-['Rajdhani'] font-semibold">DEFENSE</div>
            <div className="text-xs text-[#e9f1f7] font-['Orbitron']">+{part.defense}</div>
          </div>
          <div className="bg-[#0a1128]/50 rounded p-1">
            <div className="text-xs text-[#fbbc05] font-['Rajdhani'] font-semibold">SPEED</div>
            <div className="text-xs text-[#e9f1f7] font-['Orbitron']">+{part.speed}</div>
          </div>
          <div className="bg-[#0a1128]/50 rounded p-1">
            <div className="text-xs text-[#7b42ff] font-['Rajdhani'] font-semibold">ENERGY</div>
            <div className="text-xs text-[#e9f1f7] font-['Orbitron']">+{part.energy}</div>
          </div>
        </div>
      )}
      
      {/* Cost */}
      <div className="text-right">
        <span className="text-xs text-[#e9f1f7]/70">COST:</span>
        <span className="ml-1 font-['Orbitron'] font-bold text-[#00f0ff]">{part.cost}</span>
      </div>
      
      {/* Scan line effect */}
      <div className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-70 animate-scan"></div>
    </div>
  );
};

export default RobotPartDisplay;
