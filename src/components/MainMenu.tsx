import React from 'react';
import { useGame } from '../context/GameContext';
import { Bot, Sword, ShoppingCart, Trophy, Brain } from 'lucide-react';
import Button from './ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';

const MainMenu: React.FC = () => {
  const { state, dispatch } = useGame();
  const { player } = state;

  const navigateTo = (screen: 'builder' | 'battle' | 'marketplace' | 'leaderboard') => {
    dispatch({ type: 'CHANGE_SCREEN', payload: screen });
  };

  const hasRobot = player.robots.length > 0;
  const activeRobot = player.robots.find(robot => robot.id === player.activeRobotId);
  const isRobotComplete = activeRobot &&
    Object.keys(activeRobot.parts).length === 4; // Has all 4 part types

  return (
    <div className="w-full max-w-4xl mx-auto pt-8 px-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-['Orbitron'] font-bold text-[#b14aed] mb-2 text-shadow-purple">POWER UP YOUR ROBOTS</h1>
        <p className="text-lg text-black font-medium mb-4">Build, battle, and upgrade your robots with Alibaba Cloud technologies</p>

        <div className="flex items-center gap-4 p-3 frosted-glass rounded-lg border border-[#b14aed]/30">
          <div className="text-lg font-medium">
            <span className="text-black font-semibold">Credits:</span> <span className="text-[#00f0ff] font-['Orbitron']">{player.credits}</span>
          </div>
          <div className="text-lg font-medium">
            <span className="text-black font-semibold">Wins:</span> <span className="text-[#00ff88] font-['Orbitron']">{player.wins}</span>
          </div>
          <div className="text-lg font-medium">
            <span className="text-black font-semibold">Losses:</span> <span className="text-[#ff3366] font-['Orbitron']">{player.losses}</span>
          </div>
        </div>
      </div>

      {activeRobot && (
        <Card className="mb-8 frosted-glass border border-[#b14aed]/30">
          <CardHeader>
            <CardTitle className="text-center font-['Orbitron'] text-[#b14aed] font-bold text-shadow-purple">
              ACTIVE ROBOT: {activeRobot.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Level and Experience */}
            <div className="mb-4 bg-[#0a1128]/50 p-3 rounded-md border border-[#b14aed]/30">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium font-['Orbitron'] text-[#b14aed]">LEVEL {activeRobot.level || 1}</span>
                <span className="text-sm text-black font-medium font-['Rajdhani']">
                  XP: {activeRobot.experience || 0}/{(activeRobot.level || 1) * 100}
                </span>
              </div>
              <div className="w-full bg-[#0a1128]/70 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#7b42ff] to-[#b14aed] h-2 rounded-full"
                  style={{ width: `${Math.min(100, ((activeRobot.experience || 0) / ((activeRobot.level || 1) * 100)) * 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0a1128]/50 p-3 rounded-md border border-[#ff3366]/30">
                <p className="text-sm text-[#ff3366] font-['Rajdhani'] font-semibold">POWER</p>
                <div className="flex items-center">
                  <div className="w-full bg-[#0a1128]/70 rounded-full h-2.5 mr-2">
                    <div className="bg-[#ff3366] h-2.5 rounded-full" style={{ width: `${activeRobot.stats.power}%` }}></div>
                  </div>
                  <span className="text-sm font-medium text-black font-['Orbitron']">{activeRobot.stats.power}</span>
                </div>
              </div>
              <div className="bg-[#0a1128]/50 p-3 rounded-md border border-[#00ff88]/30">
                <p className="text-sm text-[#00ff88] font-['Rajdhani'] font-semibold">DEFENSE</p>
                <div className="flex items-center">
                  <div className="w-full bg-[#0a1128]/70 rounded-full h-2.5 mr-2">
                    <div className="bg-[#00ff88] h-2.5 rounded-full" style={{ width: `${activeRobot.stats.defense}%` }}></div>
                  </div>
                  <span className="text-sm font-medium text-black font-['Orbitron']">{activeRobot.stats.defense}</span>
                </div>
              </div>
              <div className="bg-[#0a1128]/50 p-3 rounded-md border border-[#fbbc05]/30">
                <p className="text-sm text-[#fbbc05] font-['Rajdhani'] font-semibold">SPEED</p>
                <div className="flex items-center">
                  <div className="w-full bg-[#0a1128]/70 rounded-full h-2.5 mr-2">
                    <div className="bg-[#fbbc05] h-2.5 rounded-full" style={{ width: `${activeRobot.stats.speed}%` }}></div>
                  </div>
                  <span className="text-sm font-medium text-black font-['Orbitron']">{activeRobot.stats.speed}</span>
                </div>
              </div>
              <div className="bg-[#0a1128]/50 p-3 rounded-md border border-[#7b42ff]/30">
                <p className="text-sm text-[#7b42ff] font-['Rajdhani'] font-semibold">ENERGY</p>
                <div className="flex items-center">
                  <div className="w-full bg-[#0a1128]/70 rounded-full h-2.5 mr-2">
                    <div className="bg-[#7b42ff] h-2.5 rounded-full" style={{ width: `${activeRobot.stats.energy}%` }}></div>
                  </div>
                  <span className="text-sm font-medium text-black font-['Orbitron']">{activeRobot.stats.energy}</span>
                </div>
              </div>
            </div>
            {!isRobotComplete && (
              <p className="mt-4 text-center text-[#fbbc05] font-['Rajdhani'] font-semibold text-shadow-sm">
                WARNING: ROBOT INCOMPLETE! VISIT BUILDER TO ADD MORE PARTS.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="transform transition-all hover:scale-[1.02] frosted-glass border border-[#b14aed]/30">
          <CardHeader>
            <CardTitle className="flex items-center font-['Orbitron'] text-[#b14aed] font-bold text-shadow-purple">
              <Bot className="w-5 h-5 mr-2 text-[#b14aed]" />
              Robot Builder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-black font-['Rajdhani'] font-semibold text-sm">
              Build and customize your robot using cloud-powered components. Each part is empowered by an Alibaba Cloud service.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="primary"
              fullWidth
              leftIcon={<Brain />}
              onClick={() => navigateTo('builder')}
            >
              {hasRobot ? 'Customize Robot' : 'Create New Robot'}
            </Button>
          </CardFooter>
        </Card>

        <Card className="transform transition-all hover:scale-[1.02] frosted-glass border border-[#b14aed]/30">
          <CardHeader>
            <CardTitle className="flex items-center font-['Orbitron'] text-[#b14aed] font-bold text-shadow-purple">
              <Sword className="w-5 h-5 mr-2 text-[#b14aed]" />
              Battle Arena
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-black font-['Rajdhani'] font-semibold text-sm">
              Put your robot to the test in cloud-driven battles against AI opponents. Win to earn credits for upgrades.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="accent"
              fullWidth
              leftIcon={<Sword />}
              onClick={() => navigateTo('battle')}
              disabled={!isRobotComplete}
            >
              Enter Battle Arena
            </Button>
          </CardFooter>
        </Card>

        <Card className="transform transition-all hover:scale-[1.02] frosted-glass border border-[#b14aed]/30">
          <CardHeader>
            <CardTitle className="flex items-center font-['Orbitron'] text-[#b14aed] font-bold text-shadow-purple">
              <ShoppingCart className="w-5 h-5 mr-2 text-[#b14aed]" />
              Cloud Marketplace
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-black font-['Rajdhani'] font-semibold text-sm">
              Browse and purchase powerful robot parts empowered by Alibaba Cloud services to upgrade your robot.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              fullWidth
              leftIcon={<ShoppingCart />}
              onClick={() => navigateTo('marketplace')}
              disabled={!hasRobot}
            >
              Shop for Parts
            </Button>
          </CardFooter>
        </Card>

        <Card className="transform transition-all hover:scale-[1.02] frosted-glass border border-[#b14aed]/30">
          <CardHeader>
            <CardTitle className="flex items-center font-['Orbitron'] text-[#b14aed] font-bold text-shadow-purple">
              <Trophy className="w-5 h-5 mr-2 text-[#b14aed]" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-black font-['Rajdhani'] font-semibold text-sm">
              See the top robots and players ranked by victories and performance, all powered by cloud analytics.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              fullWidth
              leftIcon={<Trophy />}
              onClick={() => navigateTo('leaderboard')}
            >
              View Leaderboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default MainMenu;