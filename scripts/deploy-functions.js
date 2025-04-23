/**
 * Script to deploy serverless functions to Alibaba Cloud Function Compute
 * 
 * This script packages and deploys serverless functions to Alibaba Cloud
 * Function Compute for handling game logic.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const FCClient = require('@alicloud/fc2');
const archiver = require('archiver');

// Load deployment configuration
const config = require('../deploy.config.js');

// Initialize Function Compute client
const fcClient = new FCClient({
  accessKeyID: config.oss.accessKeyId,
  accessKeySecret: config.oss.accessKeySecret,
  region: config.functionCompute.region,
});

/**
 * Create a zip archive of a function's code
 * @param {string} functionName - Name of the function
 * @returns {Promise<string>} Path to the created zip file
 */
async function createFunctionZip(functionName) {
  return new Promise((resolve, reject) => {
    const functionDir = path.resolve(__dirname, '../functions', functionName);
    const outputPath = path.resolve(__dirname, `../functions/${functionName}.zip`);
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });
    
    output.on('close', () => {
      console.log(`Created zip archive for ${functionName}: ${archive.pointer()} bytes`);
      resolve(outputPath);
    });
    
    archive.on('error', (err) => {
      reject(err);
    });
    
    archive.pipe(output);
    archive.directory(functionDir, false);
    archive.finalize();
  });
}

/**
 * Check if a service exists
 * @param {string} serviceName - Name of the service
 * @returns {Promise<boolean>} Whether the service exists
 */
async function serviceExists(serviceName) {
  try {
    await fcClient.getService(serviceName);
    return true;
  } catch (error) {
    if (error.code === 'ServiceNotFound') {
      return false;
    }
    throw error;
  }
}

/**
 * Create a Function Compute service
 * @returns {Promise<void>}
 */
async function createService() {
  const serviceName = config.functionCompute.serviceName;
  
  try {
    const exists = await serviceExists(serviceName);
    
    if (!exists) {
      console.log(`Creating Function Compute service: ${serviceName}`);
      await fcClient.createService(serviceName, {
        description: 'Service for Cody\'s Cloud Arena game functions',
      });
      console.log('Service created successfully');
    } else {
      console.log(`Service ${serviceName} already exists`);
    }
  } catch (error) {
    console.error('Failed to create service:', error.message);
    throw error;
  }
}

/**
 * Check if a function exists
 * @param {string} serviceName - Name of the service
 * @param {string} functionName - Name of the function
 * @returns {Promise<boolean>} Whether the function exists
 */
async function functionExists(serviceName, functionName) {
  try {
    await fcClient.getFunction(serviceName, functionName);
    return true;
  } catch (error) {
    if (error.code === 'FunctionNotFound') {
      return false;
    }
    throw error;
  }
}

/**
 * Deploy a function to Function Compute
 * @param {Object} functionConfig - Function configuration
 * @returns {Promise<void>}
 */
async function deployFunction(functionConfig) {
  const { name, handler, runtime, timeout } = functionConfig;
  const serviceName = config.functionCompute.serviceName;
  
  try {
    console.log(`Deploying function: ${name}`);
    
    // Create zip archive of the function code
    const zipPath = await createFunctionZip(name);
    const codeBuffer = fs.readFileSync(zipPath);
    
    const exists = await functionExists(serviceName, name);
    
    if (exists) {
      // Update existing function
      console.log(`Updating existing function: ${name}`);
      await fcClient.updateFunction(serviceName, name, {
        handler,
        runtime,
        timeout,
        code: {
          zipFile: codeBuffer.toString('base64'),
        },
      });
    } else {
      // Create new function
      console.log(`Creating new function: ${name}`);
      await fcClient.createFunction(serviceName, {
        functionName: name,
        handler,
        runtime,
        timeout,
        code: {
          zipFile: codeBuffer.toString('base64'),
        },
      });
    }
    
    // Clean up the zip file
    fs.unlinkSync(zipPath);
    
    console.log(`Function ${name} deployed successfully`);
  } catch (error) {
    console.error(`Failed to deploy function ${name}:`, error.message);
    throw error;
  }
}

/**
 * Main function to deploy all functions
 */
async function deployAllFunctions() {
  try {
    // Create the service if it doesn't exist
    await createService();
    
    // Deploy each function
    for (const functionConfig of config.functionCompute.functions) {
      await deployFunction(functionConfig);
    }
    
    console.log('All functions deployed successfully');
  } catch (error) {
    console.error('Function deployment failed:', error);
    process.exit(1);
  }
}

// Run the deployment process
deployAllFunctions();
