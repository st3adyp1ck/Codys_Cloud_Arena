import React from 'react';

interface RobotStatsDisplayProps {
  stats: {
    power: number;
    defense: number;
    speed: number;
    energy: number;
  };
  level?: number;
  experience?: number;
  compact?: boolean;
}

const RobotStatsDisplay: React.FC<RobotStatsDisplayProps> = ({
  stats,
  level = 1,
  experience = 0,
  compact = false
}) => {
  const xpForNextLevel = level * 100;
  const xpPercentage = Math.min(100, (experience / xpForNextLevel) * 100);

  return (
    <div className={`${compact ? 'p-2' : 'p-4'} bg-[#0a1128]/80 rounded-lg border border-[#00f0ff]/30 relative overflow-hidden`}>
      {/* Background circuit pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00f0ff]"></div>
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-[#00f0ff]"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#00f0ff]"></div>
        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-[#00f0ff]"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#00f0ff]"></div>

        <div className="absolute left-0 top-0 w-[1px] h-full bg-[#00f0ff]"></div>
        <div className="absolute left-1/4 top-0 w-[1px] h-full bg-[#00f0ff]"></div>
        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[#00f0ff]"></div>
        <div className="absolute left-3/4 top-0 w-[1px] h-full bg-[#00f0ff]"></div>
        <div className="absolute right-0 top-0 w-[1px] h-full bg-[#00f0ff]"></div>
      </div>

      {/* Level and XP */}
      <div className={`${compact ? 'mb-2' : 'mb-4'} relative`}>
        <div className="flex justify-between items-center">
          <div className="font-['Orbitron'] font-bold text-[#00f0ff]">
            LEVEL {level}
          </div>
          <div className="text-sm text-black font-medium">
            XP: {experience}/{xpForNextLevel}
          </div>
        </div>
        <div className="mt-1 h-2 bg-[#0a1128] rounded-full overflow-hidden border border-[#00f0ff]/30">
          <div
            className="h-full bg-gradient-to-r from-[#00f0ff] to-[#7b42ff] rounded-full relative"
            style={{ width: `${xpPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-2">
        {/* Power */}
        <div>
          <div className="flex justify-between items-center">
            <div className="font-['Rajdhani'] font-semibold text-[#ff3366]">POWER</div>
            <div className="text-sm font-['Orbitron'] text-black font-medium">{stats.power}</div>
          </div>
          <div className="mt-1 h-2 bg-[#0a1128] rounded-full overflow-hidden border border-[#ff3366]/30">
            <div
              className="h-full bg-gradient-to-r from-[#ff3366] to-[#ff5e00] rounded-full"
              style={{ width: `${Math.min(100, stats.power)}%` }}
            ></div>
          </div>
        </div>

        {/* Defense */}
        <div>
          <div className="flex justify-between items-center">
            <div className="font-['Rajdhani'] font-semibold text-[#00ff88]">DEFENSE</div>
            <div className="text-sm font-['Orbitron'] text-black font-medium">{stats.defense}</div>
          </div>
          <div className="mt-1 h-2 bg-[#0a1128] rounded-full overflow-hidden border border-[#00ff88]/30">
            <div
              className="h-full bg-gradient-to-r from-[#00ff88] to-[#00f0ff] rounded-full"
              style={{ width: `${Math.min(100, stats.defense)}%` }}
            ></div>
          </div>
        </div>

        {/* Speed */}
        <div>
          <div className="flex justify-between items-center">
            <div className="font-['Rajdhani'] font-semibold text-[#fbbc05]">SPEED</div>
            <div className="text-sm font-['Orbitron'] text-black font-medium">{stats.speed}</div>
          </div>
          <div className="mt-1 h-2 bg-[#0a1128] rounded-full overflow-hidden border border-[#fbbc05]/30">
            <div
              className="h-full bg-gradient-to-r from-[#fbbc05] to-[#ff5e00] rounded-full"
              style={{ width: `${Math.min(100, stats.speed)}%` }}
            ></div>
          </div>
        </div>

        {/* Energy */}
        <div>
          <div className="flex justify-between items-center">
            <div className="font-['Rajdhani'] font-semibold text-[#7b42ff]">ENERGY</div>
            <div className="text-sm font-['Orbitron'] text-black font-medium">{stats.energy}</div>
          </div>
          <div className="mt-1 h-2 bg-[#0a1128] rounded-full overflow-hidden border border-[#7b42ff]/30">
            <div
              className="h-full bg-gradient-to-r from-[#7b42ff] to-[#00f0ff] rounded-full"
              style={{ width: `${Math.min(100, stats.energy)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Scan line effect */}
      <div className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-70 animate-scan"></div>
    </div>
  );
};

export default RobotStatsDisplay;
