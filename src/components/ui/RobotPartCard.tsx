import React from 'react';
import { RobotPart } from '../../types';
import Button from './Button';
import { ShoppingCart } from 'lucide-react';

interface RobotPartCardProps {
  part: RobotPart;
  alreadyHas: boolean;
  canAfford: boolean;
  hasActiveRobot: boolean;
  onBuy: () => void;
}

const RobotPartCard: React.FC<RobotPartCardProps> = ({
  part,
  alreadyHas,
  canAfford,
  hasActiveRobot,
  onBuy
}) => {
  // Get color based on part type
  const getTypeColor = () => {
    switch (part.type) {
      case 'head': return { bg: 'bg-[#00f0ff]/20', text: 'text-[#00f0ff]', border: 'border-[#00f0ff]/30' };
      case 'body': return { bg: 'bg-[#7b42ff]/20', text: 'text-[#7b42ff]', border: 'border-[#7b42ff]/30' };
      case 'arms': return { bg: 'bg-[#ff3366]/20', text: 'text-[#ff3366]', border: 'border-[#ff3366]/30' };
      case 'legs': return { bg: 'bg-[#00ff88]/20', text: 'text-[#00ff88]', border: 'border-[#00ff88]/30' };
      default: return { bg: 'bg-[#00f0ff]/20', text: 'text-[#00f0ff]', border: 'border-[#00f0ff]/30' };
    }
  };

  const colors = getTypeColor();

  return (
    <div className={`
      frosted-glass rounded-lg overflow-hidden transition-all duration-300
      ${alreadyHas ? 'border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.3)]' : 'hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]'}
      hover:-translate-y-1
    `}>
      {/* Card header */}
      <div className="p-3 border-b border-[#00f0ff]/20">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center mr-2 ${colors.border} border`}>
            <span className={`text-xs font-['Orbitron'] font-bold ${colors.text}`}>
              {part.type.substring(0, 1).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-['Orbitron'] font-bold text-[#b14aed] text-base leading-tight text-shadow-purple">
              {part.name}
            </h3>
            <p className="text-xs text-black font-medium leading-tight">
              Powered by <span className="text-[#00f0ff] font-semibold">{part.cloudService.name}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="p-3">
        <p className="text-xs text-black font-medium mb-3 line-clamp-2">{part.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
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

        {/* Cost */}
        <div className="text-right mb-3">
          <span className="text-xs text-[#e9f1f7]/70">COST:</span>
          <span className="ml-1 font-['Orbitron'] font-bold text-[#00f0ff]">{part.cost} credits</span>
        </div>

        {/* Button */}
        <button
          className={`
            w-full py-2 px-4 rounded-md font-['Orbitron'] text-sm font-semibold uppercase tracking-wider flex items-center justify-center
            ${alreadyHas
              ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30 cursor-not-allowed'
              : !canAfford
                ? 'bg-[#ff3366]/20 text-[#ff3366] border border-[#ff3366]/30 cursor-not-allowed'
                : !hasActiveRobot
                  ? 'bg-[#7b42ff]/20 text-[#7b42ff] border border-[#7b42ff]/30 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#00a2b3] to-[#00f0ff] text-[#0a1128] shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:transform hover:-translate-y-1 transition-all duration-300'
            }
          `}
          onClick={onBuy}
          disabled={alreadyHas || !canAfford || !hasActiveRobot}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {alreadyHas
            ? 'Already Installed'
            : !canAfford
              ? 'Not Enough Credits'
              : !hasActiveRobot
                ? 'No Robot Selected'
                : 'Purchase & Install'}
        </button>
      </div>

      {/* Scan line effect */}
      <div className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-70 animate-scan"></div>
    </div>
  );
};

export default RobotPartCard;
