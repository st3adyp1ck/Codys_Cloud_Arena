/**
 * Script to deploy the application to Alibaba Cloud ECS
 * 
 * This script deploys the application to an Alibaba Cloud ECS instance
 * using SSH and SCP to transfer files and execute commands.
 */

const path = require('path');
const { NodeSSH } = require('node-ssh');
const fs = require('fs');

// Load deployment configuration
const config = require('../deploy.config.js');

// Initialize SSH client
const ssh = new NodeSSH();

/**
 * Connect to the ECS instance via SSH
 * @returns {Promise<void>}
 */
async function connectToECS() {
  try {
    console.log(`Connecting to ECS instance: ${config.ecs.host}`);
    await ssh.connect({
      host: config.ecs.host,
      username: config.ecs.username,
      privateKey: config.ecs.privateKey,
    });
    console.log('Connected successfully');
  } catch (error) {
    console.error('Failed to connect to ECS instance:', error.message);
    throw error;
  }
}

/**
 * Execute a command on the remote server
 * @param {string} command - Command to execute
 * @param {string} description - Description of the command
 * @returns {Promise<string>} Command output
 */
async function executeCommand(command, description) {
  try {
    console.log(`${description}...`);
    const result = await ssh.execCommand(command);
    
    if (result.stderr) {
      console.warn(`Warning: ${result.stderr}`);
    }
    
    return result.stdout;
  } catch (error) {
    console.error(`Failed to ${description.toLowerCase()}:`, error.message);
    throw error;
  }
}

/**
 * Upload the application files to the ECS instance
 * @returns {Promise<void>}
 */
async function uploadFiles() {
  try {
    console.log('Preparing to upload application files');
    
    // Ensure the deployment directory exists
    await executeCommand(`mkdir -p ${config.ecs.deployPath}`, 'Creating deployment directory');
    
    // Upload the dist directory
    console.log('Uploading application files...');
    const failed = [];
    const successful = [];
    
    await ssh.putDirectory(
      path.resolve(__dirname, '../dist'),
      `${config.ecs.deployPath}/dist`,
      {
        recursive: true,
        concurrency: 10,
        validate: (itemPath) => {
          const baseName = path.basename(itemPath);
          return baseName.charAt(0) !== '.' && baseName !== 'node_modules';
        },
        tick: (localPath, remotePath, error) => {
          if (error) {
            failed.push(localPath);
          } else {
            successful.push(localPath);
          }
        }
      }
    );
    
    console.log(`Successfully uploaded ${successful.length} files`);
    
    if (failed.length > 0) {
      console.warn(`Failed to upload ${failed.length} files`);
    }
  } catch (error) {
    console.error('Failed to upload application files:', error.message);
    throw error;
  }
}

/**
 * Configure Nginx on the ECS instance
 * @returns {Promise<void>}
 */
async function configureNginx() {
  try {
    console.log('Configuring Nginx');
    
    // Create Nginx configuration
    const nginxConfig = `
server {
    listen 80;
    server_name _;
    root ${config.ecs.deployPath}/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}`;
    
    // Write the configuration to a temporary file
    const tempConfigPath = path.resolve(__dirname, '../temp-nginx.conf');
    fs.writeFileSync(tempConfigPath, nginxConfig);
    
    // Upload the configuration
    await ssh.putFile(
      tempConfigPath,
      '/etc/nginx/sites-available/codys-cloud-arena'
    );
    
    // Remove the temporary file
    fs.unlinkSync(tempConfigPath);
    
    // Enable the site and restart Nginx
    await executeCommand(
      'ln -sf /etc/nginx/sites-available/codys-cloud-arena /etc/nginx/sites-enabled/ && ' +
      'nginx -t && ' +
      'systemctl restart nginx',
      'Enabling Nginx configuration'
    );
    
    console.log('Nginx configured successfully');
  } catch (error) {
    console.error('Failed to configure Nginx:', error.message);
    throw error;
  }
}

/**
 * Main deployment function
 */
async function deploy() {
  try {
    await connectToECS();
    await uploadFiles();
    await configureNginx();
    
    console.log('Deployment to ECS completed successfully');
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  } finally {
    ssh.dispose();
  }
}

// Run the deployment process
deploy();
