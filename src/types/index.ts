// Game types
export interface RobotPart {
  id: string;
  name: string;
  type: 'head' | 'body' | 'arms' | 'legs';
  power: number;
  defense: number;
  speed: number;
  energy: number;
  image: string;
  description: string;
  cloudService: CloudService;
  cost: number;
}

export interface Robot {
  id: string;
  name: string;
  parts: {
    head?: RobotPart;
    body?: RobotPart;
    arms?: RobotPart;
    legs?: RobotPart;
  };
  stats: {
    power: number;
    defense: number;
    speed: number;
    energy: number;
  };
  owner: string;
  level?: number;
  experience?: number;
}

export interface Player {
  id: string;
  name: string;
  credits: number;
  robots: Robot[];
  activeRobotId: string | null;
  wins: number;
  losses: number;
}

export interface BattleMove {
  type: 'attack' | 'defend' | 'special';
  power: number;
  description: string;
}

export interface BattleState {
  playerRobot: Robot | null;
  enemyRobot: Robot | null;
  playerHealth: number;
  enemyHealth: number;
  turn: 'player' | 'enemy';
  log: string[];
  isActive: boolean;
  winner: 'player' | 'enemy' | null;
}

// Cloud service types
export interface CloudService {
  id: string;
  name: string;
  description: string;
  icon: string;
  benefits: string[];
  category: 'compute' | 'storage' | 'database' | 'ai' | 'security' | 'network';
}

// Game state
export type GameScreen = 'main' | 'builder' | 'battle' | 'marketplace' | 'leaderboard';

export interface GameState {
  currentScreen: GameScreen;
  player: Player;
  availableParts: RobotPart[];
  cloudServices: CloudService[];
  battleState: BattleState | null;
  leaderboard: Player[];
  isLoading: boolean;
  error: string | null;
}

export type GameAction =
  | { type: 'CHANGE_SCREEN'; payload: GameScreen }
  | { type: 'UPDATE_PLAYER'; payload: Partial<Player> }
  | { type: 'ADD_ROBOT_PART'; payload: { robotId: string; part: RobotPart } }
  | { type: 'CREATE_ROBOT'; payload: { name: string } }
  | { type: 'SET_ACTIVE_ROBOT'; payload: string }
  | { type: 'START_BATTLE'; payload: Robot | { playerRobot: Robot; enemyRobot: Robot } }
  | { type: 'EXECUTE_BATTLE_MOVE'; payload: BattleMove }
  | { type: 'END_BATTLE'; payload: 'player' | 'enemy' }
  | { type: 'BUY_PART'; payload: { partId: string; robotId: string } }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_LOADING'; payload: boolean };