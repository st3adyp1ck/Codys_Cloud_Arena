import React from 'react';

const CodyLogo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  return (
    <div className="flex items-center">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Robot Head */}
        <div className="relative">
          <div className="bg-gradient-to-br from-[#0a1128] to-[#1a2b57] rounded-t-xl p-1 border border-[#00f0ff]/30">
            {/* Eyes */}
            <div className="flex justify-center space-x-4 my-1">
              <div className="w-3 h-3 bg-[#00f0ff] rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-[#00f0ff] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>

            {/* Mouth/Grill */}
            <div className="flex justify-center mt-1">
              <div className="w-8 h-1 bg-[#00f0ff]/50 rounded-full"></div>
            </div>

            {/* Antenna */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-3 bg-[#00f0ff]/70 rounded-full"></div>
              <div className="w-2 h-2 bg-[#00f0ff] rounded-full -mt-1 mx-auto animate-pulse"></div>
            </div>
          </div>

          {/* Neck */}
          <div className="w-4 h-2 bg-gradient-to-b from-[#1a2b57] to-[#0a1128] mx-auto border-x border-[#00f0ff]/30"></div>

          {/* Body */}
          <div className="bg-gradient-to-br from-[#0a1128] to-[#1a2b57] rounded-b-lg p-1 border border-[#00f0ff]/30 border-t-0">
            {/* Control Panel */}
            <div className="flex justify-center space-x-1 my-1">
              <div className="w-1 h-1 bg-[#ff3366] rounded-full"></div>
              <div className="w-1 h-1 bg-[#fbbc05] rounded-full"></div>
              <div className="w-1 h-1 bg-[#00ff88] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className={`ml-3 font-['Orbitron'] font-bold ${size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : 'text-4xl'}`}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] to-[#7b42ff]">
          CODY'S
        </span>
        <span className="block text-white">CLOUD ARENA</span>
        <span className="block text-xs text-[#b14aed] mt-1">BY NORTHSTAR CODING</span>
      </div>
    </div>
  );
};

export default CodyLogo;
