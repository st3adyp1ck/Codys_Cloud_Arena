import { RobotPart } from '../types';
import { cloudServices } from './cloudServices';

// Robot parts data
export const robotParts: RobotPart[] = [
  // Heads
  {
    id: 'head-1',
    name: 'ECS Compute Core',
    type: 'head',
    power: 15,
    defense: 10,
    speed: 5,
    energy: 20,
    image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Advanced computing core powered by Alibaba Cloud ECS, providing enhanced calculation capabilities.',
    cloudService: cloudServices.find(s => s.id === 'ecs')!,
    cost: 300
  },
  {
    id: 'head-2',
    name: 'PAI Neural Net',
    type: 'head',
    power: 10,
    defense: 5,
    speed: 25,
    energy: 15,
    image: 'https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'AI-driven neural network processor that learns from each battle, powered by Alibaba Cloud PAI.',
    cloudService: cloudServices.find(s => s.id === 'pai')!,
    cost: 450
  },
  {
    id: 'head-3',
    name: 'Security Sensor Array',
    type: 'head',
    power: 5,
    defense: 25,
    speed: 15,
    energy: 10,
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Advanced security sensors powered by Alibaba Cloud Security Center for improved threat detection.',
    cloudService: cloudServices.find(s => s.id === 'cas')!,
    cost: 350
  },
  {
    id: 'head-4',
    name: 'ARMS Tactical Scanner',
    type: 'head',
    power: 20,
    defense: 15,
    speed: 20,
    energy: 15,
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Real-time tactical analysis system powered by Alibaba Cloud ARMS for battlefield advantage.',
    cloudService: cloudServices.find(s => s.id === 'arms')!,
    cost: 550
  },
  {
    id: 'head-5',
    name: 'CFW Quantum Processor',
    type: 'head',
    power: 15,
    defense: 30,
    speed: 10,
    energy: 25,
    image: 'https://images.pexels.com/photos/2399840/pexels-photo-2399840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Advanced defensive processor with quantum encryption powered by Alibaba Cloud Firewall.',
    cloudService: cloudServices.find(s => s.id === 'cfw')!,
    cost: 600
  },

  // Bodies
  {
    id: 'body-1',
    name: 'OSS Data Core',
    type: 'body',
    power: 10,
    defense: 30,
    speed: 5,
    energy: 25,
    image: 'https://images.pexels.com/photos/3785927/pexels-photo-3785927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Robust data storage core powered by Alibaba Cloud OSS, providing high durability and resilience.',
    cloudService: cloudServices.find(s => s.id === 'oss')!,
    cost: 500
  },
  {
    id: 'body-2',
    name: 'RDS Power Matrix',
    type: 'body',
    power: 20,
    defense: 20,
    speed: 10,
    energy: 20,
    image: 'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Balanced power distribution system powered by Alibaba Cloud RDS for optimal performance.',
    cloudService: cloudServices.find(s => s.id === 'rds')!,
    cost: 400
  },
  {
    id: 'body-3',
    name: 'Log Service Reactor',
    type: 'body',
    power: 30,
    defense: 15,
    speed: 5,
    energy: 30,
    image: 'https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'High-energy reactor core with real-time monitoring powered by Alibaba Cloud Log Service.',
    cloudService: cloudServices.find(s => s.id === 'sls')!,
    cost: 550
  },
  {
    id: 'body-4',
    name: 'PolarDB Fusion Core',
    type: 'body',
    power: 35,
    defense: 25,
    speed: 10,
    energy: 35,
    image: 'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Advanced fusion reactor with millisecond response time powered by Alibaba Cloud PolarDB.',
    cloudService: cloudServices.find(s => s.id === 'polardb')!,
    cost: 700
  },
  {
    id: 'body-5',
    name: 'NAS Storage Matrix',
    type: 'body',
    power: 15,
    defense: 40,
    speed: 5,
    energy: 25,
    image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Ultra-dense armor plating with integrated storage systems powered by Alibaba Cloud NAS.',
    cloudService: cloudServices.find(s => s.id === 'nas')!,
    cost: 650
  },

  // Arms
  {
    id: 'arms-1',
    name: 'Function Compute Blasters',
    type: 'arms',
    power: 35,
    defense: 5,
    speed: 15,
    energy: 20,
    image: 'https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Event-driven weapon system powered by Alibaba Cloud Function Compute for on-demand firepower.',
    cloudService: cloudServices.find(s => s.id === 'fc')!,
    cost: 450
  },
  {
    id: 'arms-2',
    name: 'Security Shield Gauntlets',
    type: 'arms',
    power: 10,
    defense: 30,
    speed: 10,
    energy: 15,
    image: 'https://images.pexels.com/photos/3912990/pexels-photo-3912990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Defensive arm enhancements with active protection powered by Alibaba Cloud Security Center.',
    cloudService: cloudServices.find(s => s.id === 'cas')!,
    cost: 400
  },
  {
    id: 'arms-3',
    name: 'Machine Learning Manipulators',
    type: 'arms',
    power: 20,
    defense: 10,
    speed: 25,
    energy: 20,
    image: 'https://images.pexels.com/photos/8566510/pexels-photo-8566510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Adaptive arm system that learns and improves with each use, powered by Alibaba Cloud PAI.',
    cloudService: cloudServices.find(s => s.id === 'pai')!,
    cost: 500
  },
  {
    id: 'arms-4',
    name: 'Serverless Pulse Cannons',
    type: 'arms',
    power: 40,
    defense: 5,
    speed: 20,
    energy: 25,
    image: 'https://images.pexels.com/photos/2570059/pexels-photo-2570059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'High-powered energy weapons that scale with battle intensity, powered by Alibaba Cloud SAE.',
    cloudService: cloudServices.find(s => s.id === 'sae')!,
    cost: 650
  },
  {
    id: 'arms-5',
    name: 'DTS Quantum Gauntlets',
    type: 'arms',
    power: 25,
    defense: 25,
    speed: 15,
    energy: 20,
    image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Balanced combat system with real-time data synchronization powered by Alibaba Cloud DTS.',
    cloudService: cloudServices.find(s => s.id === 'dts')!,
    cost: 550
  },

  // Legs
  {
    id: 'legs-1',
    name: 'CDN Speed Thrusters',
    type: 'legs',
    power: 5,
    defense: 10,
    speed: 40,
    energy: 20,
    image: 'https://images.pexels.com/photos/6153738/pexels-photo-6153738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'High-speed movement system utilizing Alibaba Cloud CDN principles for optimal acceleration.',
    cloudService: cloudServices.find(s => s.id === 'cdn')!,
    cost: 450
  },
  {
    id: 'legs-2',
    name: 'Elastic Compute Stabilizers',
    type: 'legs',
    power: 10,
    defense: 20,
    speed: 20,
    energy: 25,
    image: 'https://images.pexels.com/photos/8566573/pexels-photo-8566573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Balanced movement platform with dynamic resource allocation powered by Alibaba Cloud ECS.',
    cloudService: cloudServices.find(s => s.id === 'ecs')!,
    cost: 400
  },
  {
    id: 'legs-3',
    name: 'Database Anchor Treads',
    type: 'legs',
    power: 15,
    defense: 30,
    speed: 10,
    energy: 20,
    image: 'https://images.pexels.com/photos/8566601/pexels-photo-8566601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Sturdy movement system with high stability powered by Alibaba Cloud RDS architecture.',
    cloudService: cloudServices.find(s => s.id === 'rds')!,
    cost: 350
  },
  {
    id: 'legs-4',
    name: 'Private Zone Hover System',
    type: 'legs',
    power: 10,
    defense: 15,
    speed: 45,
    energy: 30,
    image: 'https://images.pexels.com/photos/2387819/pexels-photo-2387819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Advanced hover system with private network routing powered by Alibaba Cloud Private Zone DNS.',
    cloudService: cloudServices.find(s => s.id === 'pvtz')!,
    cost: 600
  },
  {
    id: 'legs-5',
    name: 'Firewall Jump Jets',
    type: 'legs',
    power: 20,
    defense: 20,
    speed: 35,
    energy: 25,
    image: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Secure high-mobility system with intrusion prevention powered by Alibaba Cloud Firewall.',
    cloudService: cloudServices.find(s => s.id === 'cfw')!,
    cost: 550
  }
];