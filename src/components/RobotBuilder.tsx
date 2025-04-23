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
        <h2 className="text-2xl font-bold text-blue-600">Robot Builder</h2>
      </div>

      {/* New Robot Form */}
      {showNewRobotForm ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Robot</CardTitle>
            <CardDescription>Give your robot a name to begin building</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <label htmlFor="robotName" className="block text-sm font-medium text-gray-700 mb-1">
                Robot Name
              </label>
              <input
                id="robotName"
                type="text"
                value={newRobotName}
                onChange={(e) => setNewRobotName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a name for your robot"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="primary"
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
              <h3 className="text-lg font-medium text-gray-700 mb-3">Select Robot</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {player.robots.map((robot) => (
                  <Card
                    key={robot.id}
                    className={`cursor-pointer transition ${robot.id === player.activeRobotId
                      ? 'border-2 border-blue-500 bg-blue-50'
                      : 'hover:bg-gray-50'
                      }`}
                    onClick={() => handleSelectRobot(robot.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bot className="w-5 h-5 mr-2 text-blue-600" />
                          <p className="font-medium">{robot.name}</p>
                        </div>
                        {robot.id === player.activeRobotId && (
                          <Check className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Card
                  className="cursor-pointer hover:bg-gray-50 flex items-center justify-center"
                  onClick={() => setShowNewRobotForm(true)}
                >
                  <CardContent className="p-4 text-center">
                    <Plus className="w-5 h-5 mx-auto mb-1 text-gray-500" />
                    <p className="text-gray-500">Create New Robot</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Active Robot Display */}
          {activeRobot && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Your Robot: {activeRobot.name}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="aspect-square bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg p-4 flex flex-col items-center justify-center">
                      <div className="relative w-full h-full max-w-xs mx-auto">
                        {/* Robot Head */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24">
                          {activeRobot.parts.head ? (
                            <div className="relative w-full h-full">
                              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
                                <Bot className="w-12 h-12 text-blue-600" />
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 text-center text-xs font-medium text-blue-800 bg-blue-100 rounded px-1">
                                {activeRobot.parts.head.name.split(' ')[0]}
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setSelectedPartType('head')}
                              className="w-full h-full rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center hover:bg-gray-100"
                            >
                              <Plus className="w-6 h-6 text-gray-400" />
                            </button>
                          )}
                        </div>

                        {/* Robot Body */}
                        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-32 h-32">
                          {activeRobot.parts.body ? (
                            <div className="relative w-full h-full">
                              <div className="absolute inset-0 rounded-md bg-gradient-to-br from-teal-200 to-teal-300">
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 text-center text-xs font-medium text-teal-800 bg-teal-100 rounded px-1">
                                {activeRobot.parts.body.name.split(' ')[0]}
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setSelectedPartType('body')}
                              className="w-full h-full rounded-md border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center hover:bg-gray-100"
                            >
                              <Plus className="w-6 h-6 text-gray-400" />
                            </button>
                          )}
                        </div>

                        {/* Robot Arms */}
                        <div className="absolute top-28 left-1/2 transform -translate-x-1/2 flex justify-between w-48">
                          {activeRobot.parts.arms ? (
                            <div className="relative w-full h-24 flex justify-between">
                              <div className="w-10 h-24 rounded-md bg-gradient-to-br from-orange-200 to-orange-300"></div>
                              <div className="absolute top-0 left-0 right-0 text-center text-xs font-medium text-orange-800 bg-orange-100 rounded px-1">
                                {activeRobot.parts.arms.name.split(' ')[0]}
                              </div>
                              <div className="w-10 h-24 rounded-md bg-gradient-to-br from-orange-200 to-orange-300"></div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setSelectedPartType('arms')}
                              className="w-full h-24 rounded-md border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center hover:bg-gray-100"
                            >
                              <Plus className="w-6 h-6 text-gray-400" />
                            </button>
                          )}
                        </div>

                        {/* Robot Legs */}
                        <div className="absolute top-56 left-1/2 transform -translate-x-1/2 flex justify-center gap-4 w-32">
                          {activeRobot.parts.legs ? (
                            <div className="relative w-full h-32 flex justify-between">
                              <div className="w-10 h-32 rounded-md bg-gradient-to-br from-purple-200 to-purple-300"></div>
                              <div className="absolute top-0 left-0 right-0 text-center text-xs font-medium text-purple-800 bg-purple-100 rounded px-1">
                                {activeRobot.parts.legs.name.split(' ')[0]}
                              </div>
                              <div className="w-10 h-32 rounded-md bg-gradient-to-br from-purple-200 to-purple-300"></div>
                            </div>
                          ) : (
                            <button
                              onClick={() => setSelectedPartType('legs')}
                              className="w-full h-32 rounded-md border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center hover:bg-gray-100"
                            >
                              <Plus className="w-6 h-6 text-gray-400" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Robot Stats</h4>
                      {/* Level and Experience */}
                      <div className="mb-4 bg-blue-50 p-3 rounded-md">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-blue-700">Level {activeRobot.level || 1}</span>
                          <span className="text-sm text-blue-600">
                            XP: {activeRobot.experience || 0}/{(activeRobot.level || 1) * 100}
                          </span>
                        </div>
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${Math.min(100, ((activeRobot.experience || 0) / ((activeRobot.level || 1) * 100)) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-black font-medium">Power</span>
                            <span className="text-sm font-medium text-gray-800">{activeRobot.stats.power}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${Math.min(100, activeRobot.stats.power)}%` }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-black font-medium">Defense</span>
                            <span className="text-sm font-medium text-gray-800">{activeRobot.stats.defense}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.min(100, activeRobot.stats.defense)}%` }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-black font-medium">Speed</span>
                            <span className="text-sm font-medium text-gray-800">{activeRobot.stats.speed}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min(100, activeRobot.stats.speed)}%` }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-black font-medium">Energy</span>
                            <span className="text-sm font-medium text-gray-800">{activeRobot.stats.energy}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${Math.min(100, activeRobot.stats.energy)}%` }}></div>
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
                <h3 className="text-lg font-medium text-gray-700">
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
                {filteredParts.map((part) => (
                  <Card
                    key={part.id}
                    className="border border-gray-200 hover:border-blue-300 hover:shadow-md transition"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{part.name}</CardTitle>
                      <CardDescription className="text-xs flex items-center">
                        Powered by {part.cloudService.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 pb-2">
                      <p className="text-xs text-black font-medium">{part.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-xs">
                          <span className="text-black font-medium">Power: </span>
                          <span className="font-medium text-gray-800">+{part.power}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-black font-medium">Defense: </span>
                          <span className="font-medium text-gray-800">+{part.defense}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-black font-medium">Speed: </span>
                          <span className="font-medium text-gray-800">+{part.speed}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-black font-medium">Energy: </span>
                          <span className="font-medium text-gray-800">+{part.energy}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
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
                ))}
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