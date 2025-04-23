import React, { useState, useEffect } from 'react';
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

      {/* Main logo */}
      <div className={`transition-all duration-500 ${glowing ? 'filter drop-shadow-[0_0_15px_rgba(123,66,255,0.8)]' : 'filter drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]'} p-4 rounded-xl bg-[#0a1128]/40 border border-[#00f0ff]/20 hover:border-[#7b42ff]/30 hover:shadow-[0_0_20px_rgba(123,66,255,0.3)] mt-4 md:mt-0`}>
        <CodyLogo size="lg" />
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent mt-2 animate-scan"></div>
      </div>
    </header>
  );
};

export default BrandedHeader;
