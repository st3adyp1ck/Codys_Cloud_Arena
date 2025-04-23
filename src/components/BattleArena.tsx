import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { BattleMove, Robot } from '../types';
import Button from './ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { Sword, Shield, Zap, ArrowLeft, Trophy, X, Cloud, Droplets, Flame, Wind } from 'lucide-react';
import { enemyRobots } from '../data/enemies';

const BattleArena: React.FC = () => {
  const { state, dispatch } = useGame();
  const { player, battleState } = state;

  // Animation states
  const [showAttackBeam, setShowAttackBeam] = useState(false);
  const [showShieldEffect, setShowShieldEffect] = useState(false);
  const [showVictoryAnimation, setShowVictoryAnimation] = useState(false);
  const [showDefeatAnimation, setShowDefeatAnimation] = useState(false);
  const [showStatusEffect, setShowStatusEffect] = useState<string | null>(null);
  const [showEnvironmentEffect, setShowEnvironmentEffect] = useState<string | null>(null);

  // Get the active robot
  const activeRobot = player.robots.find(robot => robot.id === player.activeRobotId);

  // Battle moves
  const battleMoves: BattleMove[] = [
    {
      type: 'attack',
      power: 20,
      description: 'Cloud Cannon Attack'
    },
    {
      type: 'defend',
      power: 10,
      description: 'Security Shield Defense'
    },
    {
      type: 'special',
      power: 30,
      description: 'Function Compute Special'
    }
  ];

  // Start battle
  const handleStartBattle = () => {
    if (activeRobot) {
      // Select an appropriate enemy based on player's robot level
      const playerLevel = activeRobot.level || 1;

      // Filter enemies that are within +/- 2 levels of the player's robot
      const eligibleEnemies = enemyRobots.filter(enemy => {
        const enemyLevel = enemy.level || 1;
        return Math.abs(enemyLevel - playerLevel) <= 2;
      });

      // If no eligible enemies, use all enemies
      const enemyPool = eligibleEnemies.length > 0 ? eligibleEnemies : enemyRobots;

      // Select a random enemy from the pool
      const randomIndex = Math.floor(Math.random() * enemyPool.length);
      const selectedEnemy = enemyPool[randomIndex];

      dispatch({
        type: 'START_BATTLE',
        payload: {
          playerRobot: activeRobot,
          enemyRobot: selectedEnemy
        }
      });
    }
  };

  // Execute battle move with animations
  const handleBattleMove = (move: BattleMove) => {
    // Trigger appropriate animation based on move type
    if (move.type === 'attack') {
      setShowAttackBeam(true);
      setShowEnvironmentEffect('lightning');
      setTimeout(() => {
        setShowAttackBeam(false);
        setShowEnvironmentEffect(null);
      }, 800);
    } else if (move.type === 'defend') {
      setShowShieldEffect(true);
      setShowEnvironmentEffect('water');
      setTimeout(() => {
        setShowShieldEffect(false);
        setShowEnvironmentEffect(null);
      }, 1500);
    } else if (move.type === 'special') {
      setShowStatusEffect('power');
      setShowEnvironmentEffect('fire');
      setTimeout(() => {
        setShowStatusEffect(null);
        setShowEnvironmentEffect(null);
      }, 1500);
    }

    dispatch({
      type: 'EXECUTE_BATTLE_MOVE',
      payload: move
    });
  };

  // End battle
  const handleEndBattle = () => {
    if (battleState && battleState.winner) {
      dispatch({
        type: 'END_BATTLE',
        payload: battleState.winner
      });
    }
  };

  // Go back to main menu
  const handleBackToMain = () => {
    dispatch({ type: 'CHANGE_SCREEN', payload: 'main' });
  };

  // Automatic enemy move after a delay
  useEffect(() => {
    if (battleState?.turn === 'enemy' && !battleState.winner) {
      const enemyMoveTimeout = setTimeout(() => {
        // Simulate enemy move
        const enemyMoves: BattleMove[] = [
          { type: 'attack', power: 20, description: 'Laser Blast' },
          { type: 'defend', power: 15, description: 'Shield Barrier' },
          { type: 'special', power: 25, description: 'Rocket Missile' }
        ];

        // Choose a move based on situation
        let selectedMove: BattleMove;
        if (battleState.enemyHealth < 30) {
          // Defensive when low health
          selectedMove = enemyMoves.find(move => move.type === 'defend') || enemyMoves[1]; // Default to defend
        } else if (battleState.playerHealth < 40) {
          // Aggressive when player is weak
          selectedMove = enemyMoves.find(move => move.type === 'special') || enemyMoves[0];
        } else {
          // Random move otherwise
          const randomIndex = Math.floor(Math.random() * enemyMoves.length);
          selectedMove = enemyMoves[randomIndex];
        }

        // Trigger appropriate animation based on move type
        if (selectedMove.type === 'attack') {
          setShowAttackBeam(true);
          setShowEnvironmentEffect('lightning');
          setTimeout(() => {
            setShowAttackBeam(false);
            setShowEnvironmentEffect(null);
          }, 800);
        } else if (selectedMove.type === 'defend') {
          setShowShieldEffect(true);
          setShowEnvironmentEffect('water');
          setTimeout(() => {
            setShowShieldEffect(false);
            setShowEnvironmentEffect(null);
          }, 1500);
        } else if (selectedMove.type === 'special') {
          setShowStatusEffect('power');
          setShowEnvironmentEffect('fire');
          setTimeout(() => {
            setShowStatusEffect(null);
            setShowEnvironmentEffect(null);
          }, 1500);
        }

        // Execute the move
        dispatch({
          type: 'EXECUTE_BATTLE_MOVE',
          payload: selectedMove
        });
      }, 2000); // 2 second delay for dramatic effect

      return () => clearTimeout(enemyMoveTimeout);
    }
  }, [battleState?.turn, battleState?.winner, dispatch, battleState?.enemyHealth, battleState?.playerHealth]);

  // Show victory/defeat animations when winner is determined
  useEffect(() => {
    if (battleState?.winner === 'player') {
      setShowVictoryAnimation(true);
      setShowEnvironmentEffect('wind');
    } else if (battleState?.winner === 'enemy') {
      setShowDefeatAnimation(true);
      setShowEnvironmentEffect('fire');
    }
  }, [battleState?.winner]);

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
        <h2 className="text-2xl font-bold text-orange-600">Battle Arena</h2>
      </div>

      {!battleState ? (
        // Battle preparation screen
        <div className="space-y-8">
          {activeRobot ? (
            <>
              <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100">
                <CardHeader>
                  <CardTitle>Your Robot: {activeRobot.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="text-sm text-gray-500">Power</p>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${activeRobot.stats.power}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{activeRobot.stats.power}</span>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="text-sm text-gray-500">Defense</p>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${activeRobot.stats.defense}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{activeRobot.stats.defense}</span>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="text-sm text-gray-500">Speed</p>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${activeRobot.stats.speed}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{activeRobot.stats.speed}</span>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <p className="text-sm text-gray-500">Energy</p>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${activeRobot.stats.energy}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{activeRobot.stats.energy}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100">
                <CardHeader>
                  <CardTitle>Battle Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-black font-medium mb-4">
                    Your robot will face a randomly selected opponent powered by Alibaba Cloud AI. Use your robot's unique abilities to defeat them and earn rewards!
                  </p>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <h4 className="font-medium text-gray-800 mb-2">Available Moves:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Sword className="w-4 h-4 text-red-500 mr-2" />
                        <span>Cloud Cannon Attack - High damage attack</span>
                      </li>
                      <li className="flex items-center">
                        <Shield className="w-4 h-4 text-blue-500 mr-2" />
                        <span>Security Shield Defense - Reduces incoming damage</span>
                      </li>
                      <li className="flex items-center">
                        <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                        <span>Function Compute Special - Powerful special ability</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="accent"
                    leftIcon={<Sword />}
                    onClick={handleStartBattle}
                    fullWidth
                  >
                    Start Battle
                  </Button>
                </CardFooter>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-lg text-black font-medium mb-4">
                  You need to create and select a robot before entering battle.
                </p>
                <Button
                  variant="primary"
                  onClick={() => dispatch({ type: 'CHANGE_SCREEN', payload: 'builder' })}
                >
                  Go to Robot Builder
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        // Active battle screen
        <div className="space-y-6">
          {/* Battle header with health bars */}
          <div className="grid grid-cols-2 gap-4">
            <div className="frosted-glass rounded-lg border-[#00f0ff]/40">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-['Orbitron'] font-semibold text-[#00f0ff]">
                    {battleState.playerRobot?.name}
                  </h3>
                  <span className="text-xs font-medium bg-[#00f0ff]/20 text-[#00f0ff] px-2 py-0.5 rounded-full border border-[#00f0ff]/30">
                    LVL {battleState.playerRobot?.level || 1}
                  </span>
                </div>
                <div className="w-full bg-[#0a1128]/70 rounded-full h-4 mb-2 overflow-hidden border border-[#00f0ff]/20">
                  <div
                    className="bg-gradient-to-r from-[#00a2b3] to-[#00f0ff] h-4 rounded-full transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${battleState.playerHealth}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <p className="text-sm text-right font-['Orbitron'] text-[#e9f1f7]">
                  HP: <span className="text-[#00f0ff] font-semibold">{battleState.playerHealth}</span>/100
                </p>
              </div>
            </div>

            <div className="frosted-glass rounded-lg border-[#ff3366]/40">
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-['Orbitron'] font-semibold text-[#ff3366]">
                    {battleState.enemyRobot?.name}
                  </h3>
                  <span className="text-xs font-medium bg-[#ff3366]/20 text-[#ff3366] px-2 py-0.5 rounded-full border border-[#ff3366]/30">
                    LVL {battleState.enemyRobot?.level || 1}
                  </span>
                </div>
                <div className="w-full bg-[#0a1128]/70 rounded-full h-4 mb-2 overflow-hidden border border-[#ff3366]/20">
                  <div
                    className="bg-gradient-to-r from-[#c9184a] to-[#ff3366] h-4 rounded-full transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${battleState.enemyHealth}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <p className="text-sm text-right font-['Orbitron'] text-[#e9f1f7]">
                  HP: <span className="text-[#ff3366] font-semibold">{battleState.enemyHealth}</span>/100
                </p>
              </div>
            </div>
          </div>

          {/* Battle visualization */}
          <div className="relative h-96 bg-gradient-to-br from-[#050914] via-[#0a1128] to-[#050914] rounded-lg overflow-hidden border border-[#00f0ff]/20 shadow-[0_0_30px_rgba(0,240,255,0.1)]">
            {/* Circuit board background */}
            <div className="absolute inset-0 opacity-10">
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

            {/* Scan line effect */}
            <div className="absolute left-0 top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-70 animate-scan"></div>
            {/* Dynamic grid background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 opacity-30">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={`grid-${i}`}
                    className="absolute top-0 left-0 w-full h-full border border-blue-400/30 rounded-full animate-pulse"
                    style={{
                      transform: `scale(${0.05 * (i + 1)})`,
                      transformOrigin: 'center',
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '3s'
                    }}
                  />
                ))}
              </div>

              {/* Particle effects */}
              <div className="absolute inset-0">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 bg-blue-400/50 rounded-full animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${3 + Math.random() * 4}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Player robot (CODY) with enhanced design */}
            <div className="absolute left-20 bottom-20 w-32 h-40 transform-gpu transition-all duration-500"
              style={{ transform: battleState?.turn === 'player' ? 'translateX(20px)' : 'translateX(0)' }}>
              <div className="relative">
                {/* Robot head */}
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#0a1128] to-[#1a2b57] rounded-xl border-2 border-[#00f0ff]/50 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  {/* Eyes */}
                  <div className="absolute top-4 left-2 w-3 h-3 bg-[#00f0ff] rounded-full animate-pulse" />
                  <div className="absolute top-4 right-2 w-3 h-3 bg-[#00f0ff] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  {/* Mouth */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#00f0ff]/70 rounded-full" />
                  {/* Antenna */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-3 bg-[#00f0ff]/70 rounded-full"></div>
                    <div className="w-2 h-2 bg-[#00f0ff] rounded-full -mt-1 mx-auto animate-pulse"></div>
                  </div>
                </div>

                {/* Robot body */}
                <div className="w-24 h-20 mx-auto mt-2 bg-gradient-to-br from-[#0a1128] to-[#1a2b57] rounded-lg border-2 border-[#00f0ff]/50 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  {/* Core energy */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#00f0ff]/30 rounded-full animate-pulse" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#00f0ff] rounded-full animate-ping opacity-75" />
                  {/* Control panel */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <div className="w-2 h-2 bg-[#00f0ff]/70 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-[#00f0ff]/70 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    <div className="w-2 h-2 bg-[#00f0ff]/70 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                  </div>
                </div>

                {/* Robot legs */}
                <div className="flex justify-between mt-2 px-2">
                  <div className="w-4 h-16 bg-gradient-to-b from-[#0a1128] to-[#1a2b57] rounded-lg border border-[#00f0ff]/50 shadow-[0_0_10px_rgba(0,240,255,0.2)]" />
                  <div className="w-4 h-16 bg-gradient-to-b from-[#0a1128] to-[#1a2b57] rounded-lg border border-[#00f0ff]/50 shadow-[0_0_10px_rgba(0,240,255,0.2)]" />
                </div>

                {/* Name tag */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#00f0ff]/20 px-2 py-1 rounded border border-[#00f0ff]/30">
                  <span className="text-xs font-['Orbitron'] text-[#00f0ff]">CODY</span>
                </div>
              </div>
            </div>

            {/* Enemy robot with enhanced design */}
            <div className="absolute right-20 bottom-20 w-32 h-40 transform-gpu transition-all duration-500"
              style={{ transform: battleState?.turn === 'enemy' ? 'translateX(-20px)' : 'translateX(0)' }}>
              <div className="relative">
                {/* Robot head */}
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#0a1128] to-[#1a2b57] rounded-xl border-2 border-[#ff3366]/50 shadow-[0_0_15px_rgba(255,51,102,0.3)]">
                  {/* Eyes */}
                  <div className="absolute top-4 left-2 w-3 h-3 bg-[#ff3366] rounded-full animate-pulse" />
                  <div className="absolute top-4 right-2 w-3 h-3 bg-[#ff3366] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  {/* Mouth */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#ff3366]/70 rounded-full" />
                  {/* Antenna */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-3 bg-[#ff3366]/70 rounded-full"></div>
                    <div className="w-2 h-2 bg-[#ff3366] rounded-full -mt-1 mx-auto animate-pulse"></div>
                  </div>
                </div>

                {/* Robot body */}
                <div className="w-24 h-20 mx-auto mt-2 bg-gradient-to-br from-[#0a1128] to-[#1a2b57] rounded-lg border-2 border-[#ff3366]/50 shadow-[0_0_15px_rgba(255,51,102,0.3)]">
                  {/* Core energy */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#ff3366]/30 rounded-full animate-pulse" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#ff3366] rounded-full animate-ping opacity-75" />
                  {/* Control panel */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <div className="w-2 h-2 bg-[#ff3366]/70 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-[#ff3366]/70 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    <div className="w-2 h-2 bg-[#ff3366]/70 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                  </div>
                </div>

                {/* Robot legs */}
                <div className="flex justify-between mt-2 px-2">
                  <div className="w-4 h-16 bg-gradient-to-b from-[#0a1128] to-[#1a2b57] rounded-lg border border-[#ff3366]/50 shadow-[0_0_10px_rgba(255,51,102,0.2)]" />
                  <div className="w-4 h-16 bg-gradient-to-b from-[#0a1128] to-[#1a2b57] rounded-lg border border-[#ff3366]/50 shadow-[0_0_10px_rgba(255,51,102,0.2)]" />
                </div>

                {/* Name tag */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#ff3366]/20 px-2 py-1 rounded border border-[#ff3366]/30">
                  <span className="text-xs font-['Orbitron'] text-[#ff3366]">{battleState.enemyRobot?.name.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Battle effects */}
            {battleState?.turn === 'player' && (
              <>
                <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2">
                  <div className="w-16 h-16 bg-blue-500/30 rounded-full animate-ping" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-400 rounded-full animate-pulse" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-blue-400 rounded-full animate-ripple" />
                </div>
              </>
            )}

            {battleState?.turn === 'enemy' && (
              <>
                <div className="absolute right-1/3 top-1/2 transform -translate-y-1/2">
                  <div className="w-16 h-16 bg-red-500/30 rounded-full animate-ping" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-400 rounded-full animate-pulse" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-red-400 rounded-full animate-ripple" />
                </div>
              </>
            )}

            {/* Attack animation - Energy Beam */}
            {showAttackBeam && (
              <div className="absolute left-1/4 right-1/4 top-1/2 h-4 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 transform -translate-y-1/2 origin-left animate-energy-beam rounded-full shadow-lg shadow-blue-500/50">
                <div className="absolute inset-0 bg-white/30 rounded-full blur-sm"></div>
                <div className="absolute -top-1 -bottom-1 left-0 right-0 bg-blue-300/20 rounded-full animate-pulse"></div>
              </div>
            )}

            {/* Shield effect */}
            {showShieldEffect && (
              <>
                {battleState?.turn === 'player' ? (
                  <div className="absolute left-20 bottom-20 w-40 h-48 rounded-full border-4 border-blue-400/70 animate-shield-pulse">
                    <div className="absolute inset-0 rounded-full border-4 border-blue-300/40 animate-shield-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="absolute inset-2 rounded-full border-2 border-blue-200/30 animate-shield-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                ) : (
                  <div className="absolute right-20 bottom-20 w-40 h-48 rounded-full border-4 border-red-400/70 animate-shield-pulse">
                    <div className="absolute inset-0 rounded-full border-4 border-red-300/40 animate-shield-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="absolute inset-2 rounded-full border-2 border-red-200/30 animate-shield-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                )}
              </>
            )}

            {/* Victory/Defeat animations */}
            {showVictoryAnimation && (
              <div className="absolute left-20 bottom-20 w-32 h-40 animate-victory-bounce">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-yellow-400 text-4xl font-bold">+200</div>
                <div className="absolute -top-4 -left-4 -right-4 -bottom-4">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={`victory-particle-${i}`}
                      className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.7 + 0.3,
                        transform: `scale(${Math.random() * 1 + 0.5})`,
                        animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 1}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {showDefeatAnimation && (
              <div className="absolute right-20 bottom-20 w-32 h-40 animate-defeat-shake">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-red-500 text-4xl font-bold">-100</div>
                <div className="absolute -top-4 -left-4 -right-4 -bottom-4">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={`defeat-particle-${i}`}
                      className="absolute w-1 h-3 bg-red-500 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.7 + 0.3,
                        transform: `rotate(${Math.random() * 360}deg)`,
                        animation: `float ${1 + Math.random() * 2}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 0.5}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Status effect visualizations */}
            {showStatusEffect === 'power' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <Zap className="absolute inset-0 w-full h-full text-yellow-400 animate-lightning" />
                  <Zap className="absolute inset-0 w-full h-full text-yellow-300 animate-lightning" style={{ animationDelay: '0.2s', transform: 'scale(1.2)' }} />
                  <Zap className="absolute inset-0 w-full h-full text-yellow-200 animate-lightning" style={{ animationDelay: '0.4s', transform: 'scale(1.4)' }} />
                </div>
              </div>
            )}

            {/* Background environmental effects */}
            {showEnvironmentEffect === 'lightning' && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-blue-600/30 animate-environment-pulse">
                <div className="absolute inset-0 bg-blue-500/10 animate-pulse"></div>
              </div>
            )}

            {showEnvironmentEffect === 'fire' && (
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-orange-600/30 animate-environment-pulse">
                <div className="absolute inset-0 bg-orange-500/10 animate-pulse"></div>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={`fire-particle-${i}`}
                    className="absolute w-2 h-2 bg-orange-500 rounded-full animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      bottom: '0',
                      opacity: Math.random() * 0.7 + 0.3,
                      animationDuration: `${1 + Math.random() * 2}s`,
                      animationDelay: `${Math.random() * 1}s`
                    }}
                  />
                ))}
              </div>
            )}

            {showEnvironmentEffect === 'water' && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-cyan-600/30 animate-environment-pulse">
                <div className="absolute inset-0 bg-cyan-500/10 animate-pulse"></div>
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={`water-particle-${i}`}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      opacity: Math.random() * 0.7 + 0.3,
                      animationDuration: `${3 + Math.random() * 3}s`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            )}

            {showEnvironmentEffect === 'wind' && (
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 to-teal-600/30 animate-environment-pulse">
                <div className="absolute inset-0 bg-teal-500/10 animate-pulse"></div>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={`wind-particle-${i}`}
                    className="absolute h-px bg-teal-400 rounded-full animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      width: `${10 + Math.random() * 20}px`,
                      opacity: Math.random() * 0.7 + 0.3,
                      animationDuration: `${2 + Math.random() * 2}s`,
                      animationDelay: `${Math.random() * 1}s`,
                      transform: `rotate(${Math.random() * 180}deg)`
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Battle log */}
          <div className="frosted-glass-dark rounded-lg">
            <div className="p-3 border-b border-[#00f0ff]/20">
              <h3 className="font-['Orbitron'] text-[#00f0ff] text-base">Battle Log</h3>
            </div>
            <div className="p-3">
              <div className="battle-log">
                {battleState.log.map((entry, index) => {
                  // Determine entry type
                  let entryClass = 'system';
                  if (entry.includes('Your robot')) entryClass = 'player';
                  else if (entry.includes('Enemy robot')) entryClass = 'enemy';
                  else if (entry.includes('won the battle')) entryClass = 'victory';
                  else if (entry.includes('lost the battle')) entryClass = 'defeat';

                  return (
                    <div key={index} className={`battle-log-entry ${entryClass} text-sm`}>
                      {entry}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Battle controls */}
          {battleState.winner ? (
            <div className={`frosted-glass rounded-lg overflow-hidden ${battleState.winner === 'player' ? 'border-[#00ff88]/40' : 'border-[#ff3366]/40'}`}>
              <div className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {battleState.winner === 'player' ? (
                    <div className="w-16 h-16 rounded-full bg-[#00ff88]/20 flex items-center justify-center">
                      <Trophy className="w-10 h-10 text-[#00ff88]" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-[#ff3366]/20 flex items-center justify-center">
                      <X className="w-10 h-10 text-[#ff3366]" />
                    </div>
                  )}
                </div>
                <h3 className="font-['Orbitron'] text-xl font-bold mb-3 text-readable-glow">
                  {battleState.winner === 'player'
                    ? 'VICTORY! YOUR ROBOT WINS!'
                    : 'DEFEAT! YOUR ROBOT WAS DESTROYED!'}
                </h3>
                <p className="text-black font-medium mb-2">
                  {battleState.winner === 'player'
                    ? 'You earned 200 credits for your victory!'
                    : 'You earned 50 credits as a consolation reward.'}
                </p>
                <p className={`text-sm mb-4 ${battleState.winner === 'player' ? 'text-[#00ff88]' : 'text-[#00f0ff]'}`}>
                  {battleState.winner === 'player'
                    ? `Your robot gained ${100 + ((battleState.enemyRobot?.level || 1) * 20)} experience points!`
                    : 'Your robot gained 30 experience points.'}
                </p>

                <button
                  className={`
                    w-full py-3 px-4 rounded-md font-['Orbitron'] font-semibold uppercase tracking-wider
                    ${battleState.winner === 'player'
                      ? 'bg-gradient-to-r from-[#0a9396] to-[#00ff88] text-[#0a1128] shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                      : 'bg-gradient-to-r from-[#00a2b3] to-[#00f0ff] text-[#0a1128] shadow-[0_0_15px_rgba(0,240,255,0.3)]'}
                    hover:transform hover:-translate-y-1 transition-all duration-300
                  `}
                  onClick={handleEndBattle}
                >
                  Return to Main Menu
                </button>
              </div>
            </div>
          ) : (
            battleState.turn === 'player' && (
              <div className="grid grid-cols-3 gap-4">
                {battleMoves.map((move) => {
                  let icon;
                  let colors;

                  switch (move.type) {
                    case 'attack':
                      icon = <Sword className="w-5 h-5" />;
                      colors = {
                        bg: 'bg-[#ff3366]/10',
                        border: 'border-[#ff3366]/30',
                        text: 'text-[#ff3366]',
                        glow: 'shadow-[0_0_10px_rgba(255,51,102,0.2)]'
                      };
                      break;
                    case 'defend':
                      icon = <Shield className="w-5 h-5" />;
                      colors = {
                        bg: 'bg-[#00ff88]/10',
                        border: 'border-[#00ff88]/30',
                        text: 'text-[#00ff88]',
                        glow: 'shadow-[0_0_10px_rgba(0,255,136,0.2)]'
                      };
                      break;
                    case 'special':
                      icon = <Zap className="w-5 h-5" />;
                      colors = {
                        bg: 'bg-[#7b42ff]/10',
                        border: 'border-[#7b42ff]/30',
                        text: 'text-[#7b42ff]',
                        glow: 'shadow-[0_0_10px_rgba(123,66,255,0.2)]'
                      };
                      break;
                    default:
                      colors = {
                        bg: 'bg-[#00f0ff]/10',
                        border: 'border-[#00f0ff]/30',
                        text: 'text-[#00f0ff]',
                        glow: 'shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                      };
                  }

                  return (
                    <button
                      key={move.type}
                      className={`
                        frosted-glass p-4 rounded-lg flex flex-col items-center justify-center
                        ${colors.border} ${colors.bg} ${colors.glow}
                        hover:transform hover:-translate-y-1 transition-all duration-300
                      `}
                      onClick={() => handleBattleMove(move)}
                    >
                      <div className={`mb-2 ${colors.text}`}>{icon}</div>
                      <p className={`text-sm font-['Orbitron'] font-medium mb-1 text-readable ${colors.text}`}>{move.description}</p>
                      <p className="text-xs text-[#e9f1f7]">Power: <span className={colors.text}>{move.power}</span></p>
                    </button>
                  );
                })}
              </div>
            )
          )}

          {battleState.turn === 'enemy' && !battleState.winner && (
            <div className="frosted-glass-dark text-center p-4 rounded-lg border border-[#ff3366]/30 shadow-[0_0_15px_rgba(255,51,102,0.2)]">
              <p className="text-[#ff3366] font-['Orbitron'] animate-pulse">ENEMY IS CALCULATING NEXT MOVE...</p>
            </div>
          )}
        </div>
      )}

      {!battleState && (
        <div className="mt-4 text-center">
          <button
            className="
              py-3 px-6 rounded-md font-['Orbitron'] font-semibold uppercase tracking-wider
              bg-gradient-to-r from-[#00a2b3] to-[#00f0ff] text-[#0a1128] shadow-[0_0_15px_rgba(0,240,255,0.3)]
              hover:transform hover:-translate-y-1 transition-all duration-300
            "
            onClick={handleBackToMain}
          >
            Return to Main Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default BattleArena;
