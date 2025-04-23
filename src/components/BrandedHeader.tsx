import React, { useState, useEffect } from 'react';
import { Star, Code } from 'lucide-react';
import CodyLogo from './CodyLogo';

const BrandedHeader: React.FC = () => {
  const [glowing, setGlowing] = useState(false);

  // Create a pulsing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowing(prev => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex flex-col items-center justify-center py-6 relative">
      {/* Northstar Coding Logo */}
      <div className={`absolute top-4 left-4 flex items-center transition-all duration-500 ${glowing ? 'scale-105' : 'scale-100'} p-2 rounded-lg bg-[#0a1128]/60 border border-[#00f0ff]/20 hover:border-[#7b42ff]/30 hover:shadow-[0_0_10px_rgba(123,66,255,0.2)]`}>
        <Star className={`w-5 h-5 ${glowing ? 'text-[#7b42ff]' : 'text-[#00f0ff]'} mr-1 animate-pulse`} fill={glowing ? '#7b42ff' : '#00f0ff'} />
        <span className="font-['Orbitron'] text-sm font-bold bg-gradient-to-r from-[#00f0ff] to-[#7b42ff] bg-clip-text text-transparent">
          NORTHSTAR
        </span>
      </div>

      {/* Developer signature */}
      <div className="absolute top-4 right-4 flex items-center p-2 rounded-lg bg-[#0a1128]/60 border border-[#00f0ff]/20 hover:border-[#7b42ff]/30 hover:shadow-[0_0_10px_rgba(123,66,255,0.2)]">
        <Code className="w-4 h-4 text-[#00f0ff] mr-1 animate-pulse" style={{ animationDelay: '0.3s' }} />
        <span className="font-['Rajdhani'] text-sm font-semibold text-[#e9f1f7]">
          by <span className="text-[#b14aed] font-bold text-shadow-purple">Ilya Belous</span>
        </span>
      </div>

      {/* Main logo */}
      <div className={`transition-all duration-500 ${glowing ? 'filter drop-shadow-[0_0_15px_rgba(123,66,255,0.8)]' : 'filter drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]'} p-4 rounded-xl bg-[#0a1128]/40 border border-[#00f0ff]/20 hover:border-[#7b42ff]/30 hover:shadow-[0_0_20px_rgba(123,66,255,0.3)]`}>
        <CodyLogo size="lg" />
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent mt-2 animate-scan"></div>
      </div>
    </header>
  );
};

export default BrandedHeader;
