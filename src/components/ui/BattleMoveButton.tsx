import React from 'react';
import { BattleMove } from '../../types';

interface BattleMoveButtonProps {
  move: BattleMove;
  onClick: () => void;
  disabled?: boolean;
}

const BattleMoveButton: React.FC<BattleMoveButtonProps> = ({
  move,
  onClick,
  disabled = false
}) => {
  // Get color based on move type
  const getTypeColor = () => {
    switch (move.type) {
      case 'attack': return {
        bg: 'bg-gradient-to-r from-[#c9184a]/20 to-[#ff3366]/20',
        border: 'border-[#ff3366]/40',
        text: 'text-[#ff3366]',
        glow: 'shadow-[0_0_10px_rgba(255,51,102,0.3)]'
      };
      case 'defend': return {
        bg: 'bg-gradient-to-r from-[#0a9396]/20 to-[#00ff88]/20',
        border: 'border-[#00ff88]/40',
        text: 'text-[#00ff88]',
        glow: 'shadow-[0_0_10px_rgba(0,255,136,0.3)]'
      };
      case 'special': return {
        bg: 'bg-gradient-to-r from-[#6930c3]/20 to-[#7b42ff]/20',
        border: 'border-[#7b42ff]/40',
        text: 'text-[#7b42ff]',
        glow: 'shadow-[0_0_10px_rgba(123,66,255,0.3)]'
      };
      default: return {
        bg: 'bg-gradient-to-r from-[#00a2b3]/20 to-[#00f0ff]/20',
        border: 'border-[#00f0ff]/40',
        text: 'text-[#00f0ff]',
        glow: 'shadow-[0_0_10px_rgba(0,240,255,0.3)]'
      };
    }
  };
  
  // Get icon based on move type
  const getTypeIcon = () => {
    switch (move.type) {
      case 'attack': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 17.5L3 6V3h3l11.5 11.5"></path>
          <path d="M13 19l6-6"></path>
          <path d="M16 16l4 4"></path>
          <path d="M19 21l2-2"></path>
        </svg>
      );
      case 'defend': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      );
      case 'special': return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      );
      default: return null;
    }
  };
  
  const colors = getTypeColor();
  
  return (
    <button
      className={`
        relative p-4 rounded-lg border ${colors.border} ${colors.bg}
        transition-all duration-300 overflow-hidden
        ${disabled ? 'opacity-50 cursor-not-allowed' : `${colors.glow} hover:-translate-y-1 hover:${colors.glow.replace('10px', '15px')}`}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Background circuit pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-current"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-current"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-current"></div>
        <div className="absolute left-0 top-0 w-[1px] h-full bg-current"></div>
        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-current"></div>
        <div className="absolute right-0 top-0 w-[1px] h-full bg-current"></div>
      </div>
      
      {/* Icon */}
      <div className={`flex justify-center mb-2 ${colors.text}`}>
        {getTypeIcon()}
      </div>
      
      {/* Move name */}
      <h4 className={`font-['Orbitron'] font-bold text-center ${colors.text} mb-1`}>
        {move.description}
      </h4>
      
      {/* Move power */}
      <div className="text-center">
        <span className="text-xs text-[#e9f1f7]/70">POWER:</span>
        <span className={`ml-1 font-['Orbitron'] font-bold ${colors.text}`}>{move.power}</span>
      </div>
      
      {/* Scan line effect */}
      <div className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-70 animate-scan"></div>
    </button>
  );
};

export default BattleMoveButton;
