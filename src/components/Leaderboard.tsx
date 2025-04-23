import React from 'react';
import { useGame } from '../context/GameContext';
import Button from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { ArrowLeft, Trophy, Medal, Award, Crown } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const { state, dispatch } = useGame();

  // Go back to main menu
  const handleBackToMain = () => {
    dispatch({ type: 'CHANGE_SCREEN', payload: 'main' });
  };

  // Mock leaderboard data
  const topPlayers = [
    {
      id: '1',
      name: 'CloudMaster',
      wins: 124,
      losses: 23,
      robotName: 'Thunderbolt',
      robotStats: { power: 85, defense: 70, speed: 95, energy: 80 }
    },
    {
      id: '2',
      name: 'RobotEngineer',
      wins: 98,
      losses: 32,
      robotName: 'Stormbringer',
      robotStats: { power: 95, defense: 80, speed: 60, energy: 70 }
    },
    {
      id: '3',
      name: 'AIWizard',
      wins: 87,
      losses: 41,
      robotName: 'DataCruncher',
      robotStats: { power: 65, defense: 90, speed: 75, energy: 85 }
    },
    {
      id: '4',
      name: 'CloudNinja',
      wins: 76,
      losses: 35,
      robotName: 'ShadowByte',
      robotStats: { power: 70, defense: 65, speed: 100, energy: 75 }
    },
    {
      id: '5',
      name: 'TechGuru',
      wins: 65,
      losses: 47,
      robotName: 'IronCore',
      robotStats: { power: 90, defense: 85, speed: 55, energy: 65 }
    }
  ];

  // Add player to leaderboard
  const leaderboardWithPlayer = [
    ...topPlayers,
    {
      id: state.player.id,
      name: state.player.name,
      wins: state.player.wins,
      losses: state.player.losses,
      robotName: state.player.robots.find(r => r.id === state.player.activeRobotId)?.name || 'N/A',
      robotStats: state.player.robots.find(r => r.id === state.player.activeRobotId)?.stats || { power: 0, defense: 0, speed: 0, energy: 0 }
    }
  ]
    .sort((a, b) => b.wins - a.wins)
    .slice(0, 10);

  // Get player rank
  const playerRank = leaderboardWithPlayer.findIndex(p => p.id === state.player.id) + 1;

  // Render medal for top 3
  const renderRankMedal = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="relative">
            <Crown className="w-6 h-6 text-[#ffd700]" />
            <div className="absolute inset-0 animate-pulse opacity-50">
              <Crown className="w-6 h-6 text-[#ffd700]" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="relative">
            <Medal className="w-6 h-6 text-[#c0c0c0]" />
            <div className="absolute inset-0 animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}>
              <Medal className="w-6 h-6 text-[#c0c0c0]" />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="relative">
            <Award className="w-6 h-6 text-[#cd7f32]" />
            <div className="absolute inset-0 animate-pulse opacity-50" style={{ animationDelay: '1s' }}>
              <Award className="w-6 h-6 text-[#cd7f32]" />
            </div>
          </div>
        );
      default:
        return (
          <span className="w-6 h-6 inline-flex items-center justify-center bg-[#0a1128]/70 text-[#e9f1f7] border border-[#7b42ff]/40 rounded-full text-xs font-medium">
            {rank}
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pt-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft />}
          onClick={handleBackToMain}
        >
          Back to Main Menu
        </Button>
        <h2 className="text-2xl font-['Orbitron'] font-bold text-[#b14aed] text-shadow-purple">Leaderboard</h2>
      </div>

      <Card className="mb-8 motherboard-card purple p-0 relative">
        <div className="circuit-traces"></div>
        <div className="connection-points"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center font-['Orbitron'] text-[#b14aed] font-bold text-shadow-purple">
            <Trophy className="w-5 h-5 text-[#b14aed] mr-2" />
            Top Robot Warriors
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="text-[#e9f1f7] font-['Rajdhani'] font-semibold text-sm mb-2">
            The most successful robot warriors ranked by wins.
            Battle more to climb the ranks!
          </p>

          <div className="text-sm text-[#e9f1f7]">
            Your current rank:
            <span className="ml-1 font-bold text-[#b14aed] font-['Orbitron']">
              {playerRank <= 10 ? `#${playerRank}` : 'Not in top 10'}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {leaderboardWithPlayer.map((player, index) => {
          const isCurrentPlayer = player.id === state.player.id;

          // Determine card variant based on rank
          const getCardVariant = () => {
            if (isCurrentPlayer) return 'blue';
            if (index === 0) return 'gold'; // First place
            if (index === 1) return 'silver'; // Second place
            if (index === 2) return 'bronze'; // Third place
            return 'purple'; // Others
          };

          return (
            <Card
              key={player.id}
              className={`motherboard-card ${getCardVariant()} p-0 relative transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="circuit-traces"></div>
              <div className="connection-points"></div>
              <CardContent className="p-4 relative z-10">
                <div className="flex items-center">
                  <div className="mr-3">
                    {renderRankMedal(index + 1)}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className={`font-medium ${isCurrentPlayer ? 'text-[#00f0ff]' : 'text-[#e9f1f7]'}`}>
                          {player.name} {isCurrentPlayer && '(You)'}
                        </h3>
                        <p className="text-xs text-[#e9f1f7]/70">
                          Robot: <span className="text-[#b14aed]">{player.robotName}</span>
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-medium text-[#00ff88]">
                          {player.wins} Wins
                        </div>
                        <div className="text-xs text-[#ff3366]">
                          {player.losses} Losses
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 grid grid-cols-4 gap-2">
                      <div className="text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#ff3366]">PWR</span>
                          <span className="font-medium text-[#e9f1f7]">{player.robotStats.power}</span>
                        </div>
                        <div className="w-full bg-[#0a1128]/90 rounded-full h-1 mt-1 relative overflow-hidden">
                          <div
                            className="bg-[#ff3366] h-1 rounded-full"
                            style={{ width: `${player.robotStats.power}%` }}
                          >
                            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-30 animate-progress-shine"></div>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#00ff88]">DEF</span>
                          <span className="font-medium text-[#e9f1f7]">{player.robotStats.defense}</span>
                        </div>
                        <div className="w-full bg-[#0a1128]/90 rounded-full h-1 mt-1 relative overflow-hidden">
                          <div
                            className="bg-[#00ff88] h-1 rounded-full"
                            style={{ width: `${player.robotStats.defense}%` }}
                          >
                            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-30 animate-progress-shine" style={{ animationDelay: '0.5s' }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#fbbc05]">SPD</span>
                          <span className="font-medium text-[#e9f1f7]">{player.robotStats.speed}</span>
                        </div>
                        <div className="w-full bg-[#0a1128]/90 rounded-full h-1 mt-1 relative overflow-hidden">
                          <div
                            className="bg-[#fbbc05] h-1 rounded-full"
                            style={{ width: `${player.robotStats.speed}%` }}
                          >
                            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-30 animate-progress-shine" style={{ animationDelay: '1s' }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs">
                        <div className="flex justify-between">
                          <span className="text-[#7b42ff]">NRG</span>
                          <span className="font-medium text-[#e9f1f7]">{player.robotStats.energy}</span>
                        </div>
                        <div className="w-full bg-[#0a1128]/90 rounded-full h-1 mt-1 relative overflow-hidden">
                          <div
                            className="bg-[#7b42ff] h-1 rounded-full"
                            style={{ width: `${player.robotStats.energy}%` }}
                          >
                            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-30 animate-progress-shine" style={{ animationDelay: '1.5s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <Button
          variant="outline"
          onClick={handleBackToMain}
        >
          Return to Main Menu
        </Button>
      </div>
    </div>
  );
};

export default Leaderboard;