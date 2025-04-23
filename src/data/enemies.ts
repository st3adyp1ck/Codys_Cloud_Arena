import { Robot } from '../types';
import { robotParts } from './robotParts';

// Predetermined enemy robots
export const enemyRobots: Robot[] = [
  {
    id: 'enemy-1',
    name: 'CloudCrusher',
    parts: {
      head: robotParts.find(part => part.id === 'head-1'),
      body: robotParts.find(part => part.id === 'body-1'),
      arms: robotParts.find(part => part.id === 'arms-1'),
      legs: robotParts.find(part => part.id === 'legs-1'),
    },
    stats: {
      power: 70,
      defense: 55,
      speed: 65,
      energy: 85
    },
    owner: 'AI',
    level: 1,
    experience: 0
  },
  {
    id: 'enemy-2',
    name: 'DataDestroyer',
    parts: {
      head: robotParts.find(part => part.id === 'head-2'),
      body: robotParts.find(part => part.id === 'body-2'),
      arms: robotParts.find(part => part.id === 'arms-2'),
      legs: robotParts.find(part => part.id === 'legs-2'),
    },
    stats: {
      power: 60,
      defense: 75,
      speed: 55,
      energy: 70
    },
    owner: 'AI',
    level: 2,
    experience: 0
  },
  {
    id: 'enemy-3',
    name: 'NetworkNinja',
    parts: {
      head: robotParts.find(part => part.id === 'head-3'),
      body: robotParts.find(part => part.id === 'body-3'),
      arms: robotParts.find(part => part.id === 'arms-3'),
      legs: robotParts.find(part => part.id === 'legs-3'),
    },
    stats: {
      power: 80,
      defense: 50,
      speed: 90,
      energy: 75
    },
    owner: 'AI',
    level: 3,
    experience: 0
  },
  {
    id: 'enemy-4',
    name: 'PolarPunisher',
    parts: {
      head: robotParts.find(part => part.id === 'head-4'),
      body: robotParts.find(part => part.id === 'body-4'),
      arms: robotParts.find(part => part.id === 'arms-4'),
      legs: robotParts.find(part => part.id === 'legs-4'),
    },
    stats: {
      power: 90,
      defense: 60,
      speed: 70,
      energy: 85
    },
    owner: 'AI',
    level: 4,
    experience: 0
  },
  {
    id: 'enemy-5',
    name: 'FirewallPhantom',
    parts: {
      head: robotParts.find(part => part.id === 'head-5'),
      body: robotParts.find(part => part.id === 'body-5'),
      arms: robotParts.find(part => part.id === 'arms-5'),
      legs: robotParts.find(part => part.id === 'legs-5'),
    },
    stats: {
      power: 75,
      defense: 85,
      speed: 65,
      energy: 80
    },
    owner: 'AI',
    level: 5,
    experience: 0
  },
  {
    id: 'enemy-6',
    name: 'ServerlessStriker',
    parts: {
      head: robotParts.find(part => part.id === 'head-4'),
      body: robotParts.find(part => part.id === 'body-3'),
      arms: robotParts.find(part => part.id === 'arms-4'),
      legs: robotParts.find(part => part.id === 'legs-1'),
    },
    stats: {
      power: 95,
      defense: 40,
      speed: 90,
      energy: 70
    },
    owner: 'AI',
    level: 6,
    experience: 0
  },
  {
    id: 'enemy-7',
    name: 'StorageTitan',
    parts: {
      head: robotParts.find(part => part.id === 'head-3'),
      body: robotParts.find(part => part.id === 'body-5'),
      arms: robotParts.find(part => part.id === 'arms-2'),
      legs: robotParts.find(part => part.id === 'legs-3'),
    },
    stats: {
      power: 60,
      defense: 100,
      speed: 40,
      energy: 90
    },
    owner: 'AI',
    level: 7,
    experience: 0
  }
];