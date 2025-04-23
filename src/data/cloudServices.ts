import { CloudService } from '../types';

// Alibaba Cloud Services data
export const cloudServices: CloudService[] = [
  {
    id: 'ecs',
    name: 'Elastic Compute Service',
    description: 'Secure and flexible virtual cloud servers for reliable computing.',
    icon: 'cpu',
    benefits: [
      'Scalable computing power',
      'Flexible instance types',
      'Pay-as-you-go pricing',
      'Global deployment'
    ],
    category: 'compute'
  },
  {
    id: 'sae',
    name: 'Serverless App Engine',
    description: 'Fully managed PaaS platform for application deployment without infrastructure concerns.',
    icon: 'layers',
    benefits: [
      'Zero infrastructure management',
      'Auto-scaling capabilities',
      'Microservices support',
      'Integrated monitoring'
    ],
    category: 'compute'
  },
  {
    id: 'oss',
    name: 'Object Storage Service',
    description: 'Secure, cost-effective, and scalable cloud storage service.',
    icon: 'database',
    benefits: [
      'Unlimited storage capacity',
      'High durability and availability',
      'Integrated CDN capabilities',
      'Data lifecycle management'
    ],
    category: 'storage'
  },
  {
    id: 'rds',
    name: 'Relational Database Service',
    description: 'Fully managed database service supporting MySQL, SQL Server, PostgreSQL, and MariaDB.',
    icon: 'server',
    benefits: [
      'Automated backups',
      'High availability',
      'Performance optimization',
      'Easy scaling'
    ],
    category: 'database'
  },
  {
    id: 'fc',
    name: 'Function Compute',
    description: 'Serverless platform for event-driven applications without managing infrastructure.',
    icon: 'function-square',
    benefits: [
      'Zero infrastructure management',
      'Automatic scaling',
      'Pay only for what you use',
      'Event-driven architecture'
    ],
    category: 'compute'
  },
  {
    id: 'pai',
    name: 'Machine Learning Platform',
    description: 'Machine learning platform with algorithms and tools for deep learning.',
    icon: 'brain',
    benefits: [
      'Pre-built algorithms',
      'GPU-accelerated training',
      'Model deployment and management',
      'Visual modeling capabilities'
    ],
    category: 'ai'
  },
  {
    id: 'cdn',
    name: 'Content Delivery Network',
    description: 'Distribute content to users across the world with low latency.',
    icon: 'network',
    benefits: [
      'Global content distribution',
      'Improved load times',
      'Reduced bandwidth costs',
      'DDoS protection'
    ],
    category: 'network'
  },
  {
    id: 'sls',
    name: 'Log Service',
    description: 'One-stop service for log collection, processing, analysis, and visualization.',
    icon: 'file-text',
    benefits: [
      'Real-time log collection',
      'Powerful search capabilities',
      'Visualized dashboards',
      'Log-based alerts'
    ],
    category: 'ai'
  },
  {
    id: 'cas',
    name: 'Security Center',
    description: 'Security management service for cloud resources and hosts.',
    icon: 'shield',
    benefits: [
      'Intrusion detection',
      'Vulnerability management',
      'Baseline checks',
      'Security event analysis'
    ],
    category: 'security'
  },
  {
    id: 'dts',
    name: 'Data Transmission Service',
    description: 'Secure, scalable data transmission and synchronization service.',
    icon: 'repeat',
    benefits: [
      'Real-time data synchronization',
      'Multiple transmission modes',
      'Minimal downtime migrations',
      'Comprehensive monitoring'
    ],
    category: 'database'
  },
  {
    id: 'pvtz',
    name: 'Private Zone DNS',
    description: 'Private DNS resolution and management service for VPC networks.',
    icon: 'globe',
    benefits: [
      'Custom domain resolution',
      'Split-horizon DNS',
      'Centralized management',
      'High availability'
    ],
    category: 'network'
  },
  {
    id: 'arms',
    name: 'Application Real-Time Monitoring',
    description: 'End-to-end application performance monitoring and diagnostics.',
    icon: 'activity',
    benefits: [
      'Real-time monitoring',
      'Intelligent alerting',
      'Root cause analysis',
      'Custom dashboards'
    ],
    category: 'ai'
  },
  {
    id: 'sae',
    name: 'Serverless App Engine',
    description: 'Fully managed PaaS platform for application deployment without infrastructure concerns.',
    icon: 'layers',
    benefits: [
      'Zero infrastructure management',
      'Auto-scaling capabilities',
      'Microservices support',
      'Integrated monitoring'
    ],
    category: 'compute'
  },
  {
    id: 'cfw',
    name: 'Cloud Firewall',
    description: 'Cloud-native firewall service for traffic control and security protection.',
    icon: 'shield-alert',
    benefits: [
      'Centralized policy management',
      'Intrusion prevention',
      'Real-time monitoring',
      'Intelligent learning'
    ],
    category: 'security'
  },
  {
    id: 'polardb',
    name: 'PolarDB',
    description: 'Cloud-native database service with high performance and scalability.',
    icon: 'database',
    benefits: [
      'Millisecond latency',
      'Automatic scaling',
      'Serverless architecture',
      'MySQL compatibility'
    ],
    category: 'database'
  },
  {
    id: 'nas',
    name: 'Network Attached Storage',
    description: 'Fully managed file storage service for compute instances.',
    icon: 'hard-drive',
    benefits: [
      'Shared file access',
      'Elastic capacity',
      'High performance',
      'Multiple protocols'
    ],
    category: 'storage'
  }
];