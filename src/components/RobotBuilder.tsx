import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { RobotPart } from '../types';
import Button from './ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { Bot, ArrowLeft, Plus, Check } from 'lucide-react';

const RobotBuilder: React.FC = () => {
  const { state, dispatch } = useGame();
  const { player, availableParts } = state;

  const [newRobotName, setNewRobotName] = useState('');
  const [selectedPartType, setSelectedPartType] = useState<'head' | 'body' | 'arms' | 'legs' | null>(null);
  const [showNewRobotForm, setShowNewRobotForm] = useState(player.robots.length === 0);

  // Get active robot
  const activeRobot = player.robots.find(robot => robot.id === player.activeRobotId);

  // Filter parts by selected type
  const filteredParts = selectedPartType
    ? availableParts.filter(part => part.type === selectedPartType)
    : [];

  // Create new robot
  const handleCreateRobot = () => {
    if (newRobotName.trim()) {
      dispatch({
        type: 'CREATE_ROBOT',
        payload: { name: newRobotName }
      });
      setNewRobotName('');
      setShowNewRobotForm(false);
    }
  };

  // Select robot
  const handleSelectRobot = (robotId: string) => {
    dispatch({
      type: 'SET_ACTIVE_ROBOT',
      payload: robotId
    });
  };

  // Go back to main menu
  const handleBackToMain = () => {
    dispatch({ type: 'CHANGE_SCREEN', payload: 'main' });
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
        <h2 className="text-2xl font-['Orbitron'] font-bold text-[#b14aed] text-shadow-purple">Robot Builder</h2>
      </div>

      {/* New Robot Form */}
      {showNewRobotForm ? (
        <Card className="mb-8 motherboard-card purple p-0 relative">
          <div className="circuit-traces"></div>
          <div className="connection-points"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="font-['Orbitron'] text-[#b14aed] font-bold text-shadow-purple">Create New Robot</CardTitle>
            <CardDescription className="text-[#e9f1f7]">Give your robot a name to begin building</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="mb-4">
              <label htmlFor="robotName" className="block text-sm font-medium text-[#e9f1f7] mb-1">
                Robot Name
              </label>
              <input
                id="robotName"
                type="text"
                value={newRobotName}
                onChange={(e) => setNewRobotName(e.target.value)}
                className="w-full px-3 py-2 border border-[#b14aed]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b14aed] text-[#e9f1f7] font-medium bg-[#0a1128]/70 placeholder-[#e9f1f7]/50"
                placeholder="Enter a name for your robot"
              />
            </div>
          </CardContent>
          <CardFooter className="relative z-10">
            <Button
              variant="accent"
              leftIcon={<Plus />}
              onClick={handleCreateRobot}
              disabled={!newRobotName.trim()}
            >
              Create Robot
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <>
          {/* Robot Selection (if user has multiple robots) */}
          {player.robots.length > 1 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-[#e9f1f7] mb-3">Select Robot</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {player.robots.map((robot) => (
                  <Card
                    key={robot.id}
                    className={`motherboard-card ${robot.id === player.activeRobotId ? 'blue' : 'purple'} p-0 relative cursor-pointer transition`}
                    onClick={() => handleSelectRobot(robot.id)}
                  >
                    <div className="circuit-traces"></div>
                    <div className="connection-points"></div>
                    <CardContent className="p-4 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bot className="w-5 h-5 mr-2 text-[#00f0ff]" />
                          <p className="font-medium text-[#e9f1f7]">{robot.name}</p>
                        </div>
                        {robot.id === player.activeRobotId && (
                          <Check className="w-5 h-5 text-[#00f0ff]" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Card
                  className="motherboard-card green p-0 relative cursor-pointer"
                  onClick={() => setShowNewRobotForm(true)}
                >
                  <div className="circuit-traces"></div>
                  <div className="connection-points"></div>
                  <CardContent className="p-4 text-center relative z-10">
                    <Plus className="w-5 h-5 mx-auto mb-1 text-[#00ff88]" />
                    <p className="text-[#e9f1f7]">Create New Robot</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Active Robot Display */}
          {activeRobot && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-[#e9f1f7] mb-3">Your Robot: {activeRobot.name}</h3>
              <Card className="motherboard-card blue p-0 relative">
                <div className="circuit-traces"></div>
                <div className="connection-points"></div>
                <CardContent className="p-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="aspect-square bg-gradient-to-br from-[#0a1128] to-[#162040] rounded-lg p-4 flex flex-col items-center justify-center relative overflow-hidden border border-[#00f0ff]/30">
                      {/* Background effects */}
                      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                      <div className="absolute inset-0 animate-scan bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent opacity-20" style={{ transform: 'translateY(-50%)', height: '2px' }}></div>
                      <div className="absolute inset-0 animate-scan-vertical bg-gradient-to-b from-transparent via-[#7b42ff] to-transparent opacity-20" style={{ transform: 'translateX(-50%)', width: '2px', left: '50%', animationDelay: '1.5s' }}></div>

                      <div className="relative w-full h-full max-w-xs mx-auto">
                        {/* Head slot */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32">
                          {activeRobot.parts.head ? (
                            <div className="relative w-full h-full">
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#1a2b57] to-[#0a1128] border-2 border-[#00f0ff]/30 shadow-[0_0_15px_rgba(0,240,255,0.3)] overflow-hidden">
                                {/* Head details */}
                                <div className="absolute top-1/3 left-4 right-4 flex justify-between">
                                  <div className="w-6 h-6 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_10px_#00f0ff]"></div>
                                  <div className="w-6 h-6 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_10px_#00f0ff]" style={{ animationDelay: '0.5s' }}></div>
                                </div>
                                <div className="absolute bottom-6 left-4 right-4">
                                  <div className="h-2 bg-[#00f0ff]/20 rounded-full flex space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                      <div key={i} className="flex-1 bg-[#00f0ff]/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                                    ))}
                                  </div>
                                </div>
                                {/* Circuit pattern */}
                                <div className="absolute inset-0 opacity-30">
                                  <div className="absolute top-1/4 left-1/4 w-1/2 h-[1px] bg-[#00f0ff]"></div>
                                  <div className="absolute top-1/2 left-1/4 w-1/2 h-[1px] bg-[#00f0ff]"></div>
                                  <div className="absolute left-1/4 top-1/4 w-[1px] h-1/2 bg-[#00f0ff]"></div>
                                </div>
                              </div>
                              <div className="absolute -bottom-1 left-0 right-0 text-center text-xs font-['Orbitron'] text-[#00f0ff] bg-[#0a1128]/80 rounded-b-xl py-1 px-2 border-t border-[#00f0ff]/30">
                                {activeRobot.parts.head.name}
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setSelectedPartType('head')}
                              className="w-full h-full rounded-2xl border-2 border-dashed border-[#00f0ff]/30 hover:border-[#00f0ff]/60 transition-colors group"
                            >
                              <div className="absolute inset-0 rounded-2xl bg-[#1a2b57]/10 group-hover:bg-[#1a2b57]/20 transition-colors">
                                <div className="absolute inset-4 rounded-xl border border-[#00f0ff]/20" />
                                <div className="absolute top-1/3 left-4 right-4 flex justify-between opacity-30">
                                  <div className="w-4 h-4 rounded-full border border-[#00f0ff]"></div>
                                  <div className="w-4 h-4 rounded-full border border-[#00f0ff]"></div>
                                </div>
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Plus className="w-6 h-6 text-[#00f0ff]/40 group-hover:text-[#00f0ff]/60" />
                              </div>
                            </button>
                          )}
                        </div>

                        {/* Body slot */}
                        <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-48 h-48">
                          {activeRobot.parts.body ? (
                            <div className="relative w-full h-full">
                              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#1a2b57] to-[#0a1128] border-2 border-[#7b42ff]/30 shadow-[0_0_15px_rgba(123,66,255,0.3)] overflow-hidden">
                                {/* Core energy */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16">
                                  <div className="absolute inset-0 rounded-full bg-[#7b42ff]/20 animate-pulse"></div>
                                  <div className="absolute inset-2 rounded-full bg-[#7b42ff]/40 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                                  <div className="absolute inset-4 rounded-full bg-[#7b42ff] animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                                </div>
                                {/* Armor plates */}
                                <div className="absolute top-0 left-0 w-1/3 h-1/3 border-r-2 border-b-2 border-[#7b42ff]/30"></div>
                                <div className="absolute top-0 right-0 w-1/3 h-1/3 border-l-2 border-b-2 border-[#7b42ff]/30"></div>
                                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 border-r-2 border-t-2 border-[#7b42ff]/30"></div>
                                <div className="absolute bottom-0 right-0 w-1/3 h-1/3 border-l-2 border-t-2 border-[#7b42ff]/30"></div>
                              </div>
                              <div className="absolute -bottom-1 left-0 right-0 text-center text-xs font-['Orbitron'] text-[#7b42ff] bg-[#0a1128]/80 rounded-b-xl py-1 px-2 border-t border-[#7b42ff]/30">
                                {activeRobot.parts.body.name}
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setSelectedPartType('body')}
                              className="w-full h-full rounded-xl border-2 border-dashed border-[#7b42ff]/30 hover:border-[#7b42ff]/60 transition-colors group"
                            >
                              <div className="absolute inset-0 rounded-xl bg-[#1a2b57]/10 group-hover:bg-[#1a2b57]/20 transition-colors">
                                <div className="absolute inset-4 rounded-lg border border-[#7b42ff]/20" />
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#7b42ff]/30" />
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Plus className="w-6 h-6 text-[#7b42ff]/40 group-hover:text-[#7b42ff]/60" />
                              </div>
                            </button>
                          )}
                        </div>

                        {/* Arms slots */}
                        <div className="absolute top-40 left-0 w-16 h-40">
                          {activeRobot.parts.arms ? (
                            <div className="relative w-full h-full">
                              <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#1a2b57] to-[#0a1128] border-2 border-[#00ff88]/30 shadow-[0_0_15px_rgba(0,255,136,0.3)] overflow-hidden">
                                {/* Arm details */}
                                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#00ff88]/20 flex items-center justify-center">
                                  <div className="w-4 h-4 rounded-full bg-[#00ff88] animate-pulse"></div>
                                </div>
                                <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#00ff88]/20 flex items-center justify-center">
                                  <div className="w-4 h-4 rounded-full bg-[#00ff88] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                              </div>
                              <div className="absolute -bottom-1 left-0 right-0 text-center text-xs font-['Orbitron'] text-[#00ff88] bg-[#0a1128]/80 rounded-b-lg py-1 border-t border-[#00ff88]/30">
                                {activeRobot.parts.arms.name}
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setSelectedPartType('arms')}
                              className="w-full h-full rounded-lg border-2 border-dashed border-[#ff3366]/30 hover:border-[#ff3366]/60 transition-colors group"
                            >
                              <div className="absolute inset-0 rounded-lg bg-[#1a2b57]/10 group-hover:bg-[#1a2b57]/20 transition-colors">
                                <div className="absolute inset-2 rounded-md border border-[#ff3366]/20" />
                                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border border-[#ff3366]/30" />
                                <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border border-[#ff3366]/30" />
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Plus className="w-6 h-6 text-[#ff3366]/40 group-hover:text-[#ff3366]/60" />
                              </div>
                            </button>
                          )}
                        </div>

                        {/* Mirror arms to right side */}
                        <div className="absolute top-40 right-0 w-16 h-40">
                          {activeRobot.parts.arms ? (
                            <div className="relative w-full h-full transform scale-x-[-1]">
                              <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#1a2b57] to-[#0a1128] border-2 border-[#00ff88]/30 shadow-[0_0_15px_rgba(0,255,136,0.3)] overflow-hidden">
                                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#00ff88]/20 flex items-center justify-center">
                                  <div className="w-4 h-4 rounded-full bg-[#00ff88] animate-pulse"></div>
                                </div>
                                <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#00ff88]/20 flex items-center justify-center">
                                  <div className="w-4 h-4 rounded-full bg-[#00ff88] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full rounded-lg border-2 border-dashed border-[#ff3366]/30 relative">
                              <div className="absolute inset-0 rounded-lg bg-[#1a2b57]/10">
                                <div className="absolute inset-2 rounded-md border border-[#ff3366]/20" />
                                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border border-[#ff3366]/30" />
                                <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border border-[#ff3366]/30" />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Legs slot */}
                        <div className="absolute top-72 left-1/2 transform -translate-x-1/2 w-40 h-48">
                          {activeRobot.parts.legs ? (
                            <div className="relative w-full h-full">
                              <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#1a2b57] to-[#0a1128] border-2 border-[#ff3366]/30 shadow-[0_0_15px_rgba(255,51,102,0.3)] overflow-hidden">
                                {/* Leg details */}
                                <div className="flex justify-around h-full">
                                  <div className="w-1/3 h-full border-r border-[#ff3366]/30 flex flex-col justify-around items-center">
                                    <div className="w-6 h-6 rounded-full bg-[#ff3366]/20">
                                      <div className="w-full h-full rounded-full bg-[#ff3366] animate-pulse"></div>
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-[#ff3366]/20">
                                      <div className="w-full h-full rounded-full bg-[#ff3366] animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                                    </div>
                                  </div>
                                  <div className="w-1/3 h-full border-l border-[#ff3366]/30 flex flex-col justify-around items-center">
                                    <div className="w-6 h-6 rounded-full bg-[#ff3366]/20">
                                      <div className="w-full h-full rounded-full bg-[#ff3366] animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-[#ff3366]/20">
                                      <div className="w-full h-full rounded-full bg-[#ff3366] animate-pulse" style={{ animationDelay: '0.9s' }}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="absolute -bottom-1 left-0 right-0 text-center text-xs font-['Orbitron'] text-[#ff3366] bg-[#0a1128]/80 rounded-b-lg py-1 border-t border-[#ff3366]/30">
                                {activeRobot.parts.legs.name}
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setSelectedPartType('legs')}
                              className="w-full h-full rounded-lg border-2 border-dashed border-[#00ff88]/30 hover:border-[#00ff88]/60 transition-colors group"
                            >
                              <div className="absolute inset-0 rounded-lg bg-[#1a2b57]/10 group-hover:bg-[#1a2b57]/20 transition-colors">
                                <div className="absolute inset-2 rounded-md border border-[#00ff88]/20" />
                                <div className="absolute top-1/4 w-full flex justify-around">
                                  <div className="w-1 h-32 rounded-full border border-[#00ff88]/30" />
                                  <div className="w-1 h-32 rounded-full border border-[#00ff88]/30" />
                                </div>
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Plus className="w-6 h-6 text-[#00ff88]/40 group-hover:text-[#00ff88]/60" />
                              </div>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="motherboard-card purple p-4 relative">
                      <div className="circuit-traces"></div>
                      <div className="connection-points"></div>
                      <h4 className="font-medium text-[#e9f1f7] mb-2 relative z-10">Robot Stats</h4>
                      {/* Level and Experience */}
                      <div className="mb-4 bg-[#0a1128]/70 p-3 rounded-md border border-[#00f0ff]/30 relative z-10">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-[#00f0ff]">Level {activeRobot.level || 1}</span>
                          <span className="text-sm text-[#e9f1f7]">
                            XP: {activeRobot.experience || 0}/{(activeRobot.level || 1) * 100}
                          </span>
                        </div>
                        <div className="w-full bg-[#0a1128]/90 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#00f0ff] to-[#7b42ff] h-2 rounded-full relative overflow-hidden"
                            style={{ width: `${Math.min(100, ((activeRobot.experience || 0) / ((activeRobot.level || 1) * 100)) * 100)}%` }}
                          >
                            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-30 animate-progress-shine"></div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4 relative z-10">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-[#ff3366] font-medium">Power</span>
                            <span className="text-sm font-medium text-[#e9f1f7]">{activeRobot.stats.power}</span>
                          </div>
                          <div className="w-full bg-[#0a1128]/90 rounded-full h-2 relative overflow-hidden">
                            <div className="bg-[#ff3366] h-2 rounded-full" style={{ width: `${Math.min(100, activeRobot.stats.power)}%` }}>
                              <div className="absolute top-0 left-0 w-full h-full bg-white opacity-30 animate-progress-shine"></div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-[#00ff88] font-medium">Defense</span>
                            <span className="text-sm font-medium text-[#e9f1f7]">{activeRobot.stats.defense}</span>
                          </div>
                          <div className="w-full bg-[#0a1128]/90 rounded-full h-2 relative overflow-hidden">
                            <div className="bg-[#00ff88] h-2 rounded-full" style={{ width: `${Math.min(100, activeRobot.stats.defense)}%` }}>
                              <div className="absolute top-0 left-0 w-full h-full bg-white opacity-30 animate-progress-shine" style={{ animationDelay: '0.5s' }}></div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-[#fbbc05] font-medium">Speed</span>
                            <span className="text-sm font-medium text-[#e9f1f7]">{activeRobot.stats.speed}</span>
                          </div>
                          <div className="w-full bg-[#0a1128]/90 rounded-full h-2 relative overflow-hidden">
                            <div className="bg-[#fbbc05] h-2 rounded-full" style={{ width: `${Math.min(100, activeRobot.stats.speed)}%` }}>
                              <div className="absolute top-0 left-0 w-full h-full bg-white opacity-30 animate-progress-shine" style={{ animationDelay: '1s' }}></div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-[#7b42ff] font-medium">Energy</span>
                            <span className="text-sm font-medium text-[#e9f1f7]">{activeRobot.stats.energy}</span>
                          </div>
                          <div className="w-full bg-[#0a1128]/90 rounded-full h-2 relative overflow-hidden">
                            <div className="bg-[#7b42ff] h-2 rounded-full" style={{ width: `${Math.min(100, activeRobot.stats.energy)}%` }}>
                              <div className="absolute top-0 left-0 w-full h-full bg-white opacity-30 animate-progress-shine" style={{ animationDelay: '1.5s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Part Selection */}
          {selectedPartType && activeRobot && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-[#e9f1f7]">
                  Select {selectedPartType.charAt(0).toUpperCase() + selectedPartType.slice(1)}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPartType(null)}
                >
                  Cancel
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredParts.map((part) => {
                  // Get motherboard color variant based on part type
                  const getMotherboardVariant = () => {
                    switch (part.type) {
                      case 'head': return 'blue';
                      case 'body': return 'purple';
                      case 'arms': return 'green';
                      case 'legs': return 'blue';
                      default: return 'blue';
                    }
                  };

                  const motherboardVariant = getMotherboardVariant();

                  return (
                    <Card
                      key={part.id}
                      className={`motherboard-card ${motherboardVariant} p-0 relative transition-all duration-300 hover:-translate-y-1`}
                    >
                      <div className="circuit-traces"></div>
                      <div className="connection-points"></div>
                      <CardHeader className="pb-2 relative z-10">
                        <CardTitle className="text-base font-['Orbitron'] text-[#b14aed] font-bold text-shadow-purple">{part.name}</CardTitle>
                        <CardDescription className="text-xs flex items-center text-[#e9f1f7]">
                          Powered by <span className="text-[#00f0ff] font-semibold ml-1">{part.cloudService.name}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2 pb-2 relative z-10">
                        <p className="text-xs text-[#e9f1f7] font-medium">{part.description}</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-xs bg-[#0a1128]/70 p-1 rounded border border-[#ff3366]/30">
                            <span className="text-[#ff3366] font-medium">Power: </span>
                            <span className="font-medium text-[#e9f1f7]">+{part.power}</span>
                          </div>
                          <div className="text-xs bg-[#0a1128]/70 p-1 rounded border border-[#00ff88]/30">
                            <span className="text-[#00ff88] font-medium">Defense: </span>
                            <span className="font-medium text-[#e9f1f7]">+{part.defense}</span>
                          </div>
                          <div className="text-xs bg-[#0a1128]/70 p-1 rounded border border-[#fbbc05]/30">
                            <span className="text-[#fbbc05] font-medium">Speed: </span>
                            <span className="font-medium text-[#e9f1f7]">+{part.speed}</span>
                          </div>
                          <div className="text-xs bg-[#0a1128]/70 p-1 rounded border border-[#7b42ff]/30">
                            <span className="text-[#7b42ff] font-medium">Energy: </span>
                            <span className="font-medium text-[#e9f1f7]">+{part.energy}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="relative z-10">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            dispatch({
                              type: 'ADD_ROBOT_PART',
                              payload: {
                                robotId: activeRobot.id,
                                part
                              }
                            });
                            setSelectedPartType(null);
                          }}
                          fullWidth
                        >
                          Select Part
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-4 text-center">
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

export default RobotBuilder;

