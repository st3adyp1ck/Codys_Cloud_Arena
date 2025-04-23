/**
 * Script to install deployment dependencies
 * 
 * This script installs the dependencies required for deploying the application
 * to Alibaba Cloud without adding them to the main package.json.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read the deployment dependencies
const deploymentDepsPath = path.resolve(__dirname, 'deployment-dependencies.json');
const deploymentDeps = JSON.parse(fs.readFileSync(deploymentDepsPath, 'utf8'));

// Install each dependency
console.log('Installing deployment dependencies...');

const dependencies = Object.entries(deploymentDeps.dependencies)
  .map(([name, version]) => `${name}@${version}`)
  .join(' ');

try {
  execSync(`npm install --no-save ${dependencies}`, { stdio: 'inherit' });
  console.log('Deployment dependencies installed successfully');
} catch (error) {
  console.error('Failed to install deployment dependencies:', error.message);
  process.exit(1);
}
