import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, GameAction, Robot, RobotPart, BattleMove, Player } from '../types';
import { robotParts } from '../data/robotParts';
import { cloudServices } from '../data/cloudServices';
import { enemyRobots } from '../data/enemies';

// Initial game state
const initialState: GameState = {
  currentScreen: 'main',
  player: {
    id: '1',
    name: 'Player',
    credits: 1000,
    robots: [],
    activeRobotId: null,
    wins: 0,
    losses: 0,
  },
  availableParts: robotParts,
  cloudServices,
  battleState: null,
  leaderboard: [],
  isLoading: false,
  error: null,
};

// Calculate robot stats based on its parts
const calculateRobotStats = (robot: Robot): Robot => {
  const parts = Object.values(robot.parts).filter(part => part !== undefined) as RobotPart[];

  const stats = {
    power: parts.reduce((sum, part) => sum + part.power, 0),
    defense: parts.reduce((sum, part) => sum + part.defense, 0),
    speed: parts.reduce((sum, part) => sum + part.speed, 0),
    energy: parts.reduce((sum, part) => sum + part.energy, 0),
  };

  return {
    ...robot,
    stats
  };
};

// Game reducer
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'CHANGE_SCREEN':
      return {
        ...state,
        currentScreen: action.payload
      };

    case 'UPDATE_PLAYER':
      return {
        ...state,
        player: {
          ...state.player,
          ...action.payload
        }
      };

    case 'CREATE_ROBOT':
      const newRobot: Robot = {
        id: `robot-${Date.now()}`,
        name: action.payload.name,
        parts: {},
        stats: {
          power: 0,
          defense: 0,
          speed: 0,
          energy: 0
        },
        owner: state.player.id
      };

      return {
        ...state,
        player: {
          ...state.player,
          robots: [...state.player.robots, newRobot],
          activeRobotId: newRobot.id
        }
      };

    case 'ADD_ROBOT_PART':
      const { robotId, part } = action.payload;
      const updatedRobots = state.player.robots.map(robot => {
        if (robot.id === robotId) {
          const updatedParts = {
            ...robot.parts,
            [part.type]: part
          };

          const updatedRobot = {
            ...robot,
            parts: updatedParts
          };

          return calculateRobotStats(updatedRobot);
        }
        return robot;
      });

      return {
        ...state,
        player: {
          ...state.player,
          robots: updatedRobots
        }
      };

    case 'SET_ACTIVE_ROBOT':
      return {
        ...state,
        player: {
          ...state.player,
          activeRobotId: action.payload
        }
      };

    case 'START_BATTLE':
      let playerRobot;
      let enemyRobot;

      // Check if payload is a Robot or an object with playerRobot and enemyRobot
      if ('playerRobot' in action.payload && 'enemyRobot' in action.payload) {
        // New format with both robots specified
        playerRobot = action.payload.playerRobot;
        enemyRobot = action.payload.enemyRobot;
      } else {
        // Old format with just the player robot
        playerRobot = action.payload;

        // Randomly select an enemy robot
        const randomEnemyIndex = Math.floor(Math.random() * enemyRobots.length);
        enemyRobot = enemyRobots[randomEnemyIndex];
      }

      if (!playerRobot) {
        return {
          ...state,
          error: 'No active robot selected for battle'
        };
      }

      return {
        ...state,
        battleState: {
          playerRobot,
          enemyRobot,
          playerHealth: 100,
          enemyHealth: 100,
          turn: 'player',
          log: ['Battle started!'],
          isActive: true,
          winner: null
        }
      };

    case 'EXECUTE_BATTLE_MOVE':
      if (!state.battleState) return state;

      const move = action.payload;
      const { battleState } = state;
      const { playerHealth, enemyHealth } = battleState;

      let newPlayerHealth = playerHealth;
      let newEnemyHealth = enemyHealth;
      let newTurn = battleState.turn;
      let newLog = [...battleState.log];
      let winner = null;

      if (newTurn === 'player') {
        // Calculate effects based on move type
        if (move.type === 'attack') {
          // Attack move - deal damage based on power stat
          const baseDamage = move.power;
          const powerBonus = battleState.playerRobot!.stats.power / 100;
          const speedBonus = battleState.playerRobot!.stats.speed / 200; // Speed affects critical hits
          const defenseReduction = battleState.enemyRobot!.stats.defense / 150;

          // Critical hit chance based on speed
          const criticalHit = Math.random() < speedBonus;
          const criticalMultiplier = criticalHit ? 1.5 : 1;

          const actualDamage = Math.round(baseDamage * powerBonus * criticalMultiplier * (1 - defenseReduction));
          newEnemyHealth = Math.max(0, newEnemyHealth - actualDamage);

          if (criticalHit) {
            newLog.push(`CRITICAL HIT! Your robot used ${move.description} dealing ${actualDamage} damage!`);
          } else {
            newLog.push(`Your robot used ${move.description} dealing ${actualDamage} damage!`);
          }
        }
        else if (move.type === 'defend') {
          // Defend move - recover health based on defense stat
          const baseRecovery = move.power;
          const defenseBonus = battleState.playerRobot!.stats.defense / 100;
          const energyBonus = battleState.playerRobot!.stats.energy / 200;

          const actualRecovery = Math.round(baseRecovery * (defenseBonus + energyBonus));
          newPlayerHealth = Math.min(100, newPlayerHealth + actualRecovery);

          newLog.push(`Your robot used ${move.description} recovering ${actualRecovery} health!`);
        }
        else if (move.type === 'special') {
          // Special move - deal damage and apply effects based on energy stat
          const baseDamage = move.power;
          const energyBonus = battleState.playerRobot!.stats.energy / 100;
          const powerBonus = battleState.playerRobot!.stats.power / 200;
          const defenseReduction = battleState.enemyRobot!.stats.defense / 300; // Less affected by enemy defense

          const actualDamage = Math.round(baseDamage * (energyBonus + powerBonus) * (1 - defenseReduction));
          newEnemyHealth = Math.max(0, newEnemyHealth - actualDamage);

          // Also recover some health
          const healthRecovery = Math.round(move.power * 0.2);
          newPlayerHealth = Math.min(100, newPlayerHealth + healthRecovery);

          newLog.push(`Your robot used ${move.description} dealing ${actualDamage} damage and recovering ${healthRecovery} health!`);
        }

        // Check if enemy is defeated
        if (newEnemyHealth <= 0) {
          winner = 'player';
          newLog.push('You won the battle!');
        } else {
          newTurn = 'enemy';
        }
      } else {
        // Enemy's turn
        const enemyMoves: BattleMove[] = [
          { type: 'attack', power: 20, description: 'Laser Blast' },
          { type: 'defend', power: 15, description: 'Shield Barrier' },
          { type: 'special', power: 25, description: 'Rocket Missile' }
        ];

        // Choose move based on situation
        let enemyMove;
        if (enemyHealth < 30) {
          // Defensive when low health
          enemyMove = enemyMoves.find(m => m.type === 'defend') || enemyMoves[1];
        } else if (playerHealth < 40) {
          // Aggressive when player is weak
          enemyMove = enemyMoves.find(m => m.type === 'special') || enemyMoves[2];
        } else {
          // Random move otherwise
          const randomMoveIndex = Math.floor(Math.random() * enemyMoves.length);
          enemyMove = enemyMoves[randomMoveIndex];
        }

        if (enemyMove.type === 'attack') {
          // Attack move
          const baseDamage = enemyMove.power;
          const powerBonus = battleState.enemyRobot!.stats.power / 100;
          const speedBonus = battleState.enemyRobot!.stats.speed / 200;
          const defenseReduction = battleState.playerRobot!.stats.defense / 150;

          // Critical hit chance
          const criticalHit = Math.random() < speedBonus;
          const criticalMultiplier = criticalHit ? 1.5 : 1;

          const actualDamage = Math.round(baseDamage * powerBonus * criticalMultiplier * (1 - defenseReduction));
          newPlayerHealth = Math.max(0, newPlayerHealth - actualDamage);

          if (criticalHit) {
            newLog.push(`CRITICAL HIT! Enemy robot used ${enemyMove.description} dealing ${actualDamage} damage!`);
          } else {
            newLog.push(`Enemy robot used ${enemyMove.description} dealing ${actualDamage} damage!`);
          }
        }
        else if (enemyMove.type === 'defend') {
          // Defend move
          const baseRecovery = enemyMove.power;
          const defenseBonus = battleState.enemyRobot!.stats.defense / 100;
          const energyBonus = battleState.enemyRobot!.stats.energy / 200;

          const actualRecovery = Math.round(baseRecovery * (defenseBonus + energyBonus));
          newEnemyHealth = Math.min(100, newEnemyHealth + actualRecovery);

          newLog.push(`Enemy robot used ${enemyMove.description} recovering ${actualRecovery} health!`);
        }
        else if (enemyMove.type === 'special') {
          // Special move
          const baseDamage = enemyMove.power;
          const energyBonus = battleState.enemyRobot!.stats.energy / 100;
          const powerBonus = battleState.enemyRobot!.stats.power / 200;
          const defenseReduction = battleState.playerRobot!.stats.defense / 300;

          const actualDamage = Math.round(baseDamage * (energyBonus + powerBonus) * (1 - defenseReduction));
          newPlayerHealth = Math.max(0, newPlayerHealth - actualDamage);

          // Also recover some health
          const healthRecovery = Math.round(enemyMove.power * 0.2);
          newEnemyHealth = Math.min(100, newEnemyHealth + healthRecovery);

          newLog.push(`Enemy robot used ${enemyMove.description} dealing ${actualDamage} damage and recovering ${healthRecovery} health!`);
        }

        // Check if player is defeated
        if (newPlayerHealth <= 0) {
          winner = 'enemy';
          newLog.push('You lost the battle!');
        } else {
          newTurn = 'player';
        }
      }

      return {
        ...state,
        battleState: {
          ...state.battleState,
          playerHealth: newPlayerHealth,
          enemyHealth: newEnemyHealth,
          turn: newTurn,
          log: newLog,
          winner
        }
      };

    case 'END_BATTLE':
      if (!state.battleState) return state;

      const battleOutcome = action.payload;
      let updatedPlayer = { ...state.player };

      if (battleOutcome === 'player') {
        // Player won
        updatedPlayer.wins += 1;
        updatedPlayer.credits += 200; // Reward for winning

        // Add experience to the active robot
        if (updatedPlayer.activeRobotId) {
          const activeRobotIndex = updatedPlayer.robots.findIndex(r => r.id === updatedPlayer.activeRobotId);

          if (activeRobotIndex !== -1) {
            const updatedRobots = [...updatedPlayer.robots];
            const robot = { ...updatedRobots[activeRobotIndex] };

            // Initialize level and experience if they don't exist
            robot.level = robot.level || 1;
            robot.experience = robot.experience || 0;

            // Add experience based on enemy level
            const enemyLevel = state.battleState.enemyRobot?.level || 1;
            const baseXP = 100;
            const levelBonus = enemyLevel * 20;
            const experienceGained = baseXP + levelBonus;

            robot.experience += experienceGained;

            // Check for level up (100 XP per level)
            const xpForNextLevel = robot.level * 100;
            if (robot.experience >= xpForNextLevel) {
              robot.level += 1;
              robot.experience -= xpForNextLevel;

              // Improve stats on level up
              robot.stats = {
                power: Math.round(robot.stats.power * 1.1),
                defense: Math.round(robot.stats.defense * 1.1),
                speed: Math.round(robot.stats.speed * 1.1),
                energy: Math.round(robot.stats.energy * 1.1)
              };
            }

            updatedRobots[activeRobotIndex] = robot;
            updatedPlayer.robots = updatedRobots;
          }
        }
      } else {
        // Player lost
        updatedPlayer.losses += 1;
        updatedPlayer.credits += 50; // Consolation credits

        // Still gain some experience even when losing
        if (updatedPlayer.activeRobotId) {
          const activeRobotIndex = updatedPlayer.robots.findIndex(r => r.id === updatedPlayer.activeRobotId);

          if (activeRobotIndex !== -1) {
            const updatedRobots = [...updatedPlayer.robots];
            const robot = { ...updatedRobots[activeRobotIndex] };

            // Initialize level and experience if they don't exist
            robot.level = robot.level || 1;
            robot.experience = robot.experience || 0;

            // Add a smaller amount of experience for losing
            robot.experience += 30;

            updatedRobots[activeRobotIndex] = robot;
            updatedPlayer.robots = updatedRobots;
          }
        }
      }

      return {
        ...state,
        player: updatedPlayer,
        battleState: null,
        currentScreen: 'main' // Return to main screen after battle
      };

    case 'BUY_PART':
      const { partId, robotId: targetRobotId } = action.payload;
      const partToBuy = state.availableParts.find(p => p.id === partId);

      if (!partToBuy) {
        return {
          ...state,
          error: 'Part not found'
        };
      }

      if (state.player.credits < partToBuy.cost) {
        return {
          ...state,
          error: 'Not enough credits to buy this part'
        };
      }

      const targetRobot = state.player.robots.find(r => r.id === targetRobotId);

      if (!targetRobot) {
        return {
          ...state,
          error: 'Robot not found'
        };
      }

      // Update robot with new part
      const robotsWithNewPart = state.player.robots.map(robot => {
        if (robot.id === targetRobotId) {
          const updatedParts = {
            ...robot.parts,
            [partToBuy.type]: partToBuy
          };

          return calculateRobotStats({
            ...robot,
            parts: updatedParts
          });
        }
        return robot;
      });

      // Deduct credits from player
      return {
        ...state,
        player: {
          ...state.player,
          credits: state.player.credits - partToBuy.cost,
          robots: robotsWithNewPart
        },
        error: null
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
};

// Create context
const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}>({
  state: initialState,
  dispatch: () => null
});

// Provider component
export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useGame = () => useContext(GameContext);