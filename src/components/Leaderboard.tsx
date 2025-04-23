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
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 inline-flex items-center justify-center bg-gray-200 text-gray-700 rounded-full text-xs font-medium">{rank}</span>;
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
        <h2 className="text-2xl font-bold text-yellow-600">Leaderboard</h2>
      </div>
      
      <Card className="mb-8 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
            Top Robot Warriors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-2">
            The most successful robot warriors ranked by wins.
            Battle more to climb the ranks!
          </p>
          
          <div className="text-sm text-gray-600">
            Your current rank: 
            <span className="ml-1 font-bold text-yellow-600">
              {playerRank <= 10 ? `#${playerRank}` : 'Not in top 10'}
            </span>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {leaderboardWithPlayer.map((player, index) => {
          const isCurrentPlayer = player.id === state.player.id;
          
          return (
            <Card 
              key={player.id}
              className={`border ${
                isCurrentPlayer 
                  ? 'border-yellow-300 bg-yellow-50' 
                  : index < 3 
                    ? 'border-gray-200 bg-gray-50' 
                    : 'border-gray-200'
              } hover:shadow-sm transition`}
            >
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="mr-3">
                    {renderRankMedal(index + 1)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className={`font-medium ${isCurrentPlayer ? 'text-yellow-700' : 'text-gray-800'}`}>
                          {player.name} {isCurrentPlayer && '(You)'}
                        </h3>
                        <p className="text-xs text-gray-600">
                          Robot: {player.robotName}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">
                          {player.wins} Wins
                        </div>
                        <div className="text-xs text-red-500">
                          {player.losses} Losses
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 grid grid-cols-4 gap-2">
                      <div className="text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">PWR</span>
                          <span className="font-medium">{player.robotStats.power}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div 
                            className="bg-red-500 h-1 rounded-full" 
                            style={{ width: `${player.robotStats.power}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">DEF</span>
                          <span className="font-medium">{player.robotStats.defense}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div 
                            className="bg-blue-500 h-1 rounded-full" 
                            style={{ width: `${player.robotStats.defense}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">SPD</span>
                          <span className="font-medium">{player.robotStats.speed}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div 
                            className="bg-green-500 h-1 rounded-full" 
                            style={{ width: `${player.robotStats.speed}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-500">NRG</span>
                          <span className="font-medium">{player.robotStats.energy}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div 
                            className="bg-yellow-500 h-1 rounded-full" 
                            style={{ width: `${player.robotStats.energy}%` }}
                          ></div>
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