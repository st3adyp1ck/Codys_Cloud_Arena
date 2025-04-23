/**
 * Script to upload assets to Alibaba Cloud OSS
 * 
 * This script uploads the static assets from the dist directory
 * to an Alibaba Cloud OSS bucket for hosting.
 */

const fs = require('fs');
const path = require('path');
const OSS = require('ali-oss');
const mime = require('mime-types');

// Load deployment configuration
const config = require('../deploy.config.js');

// Initialize OSS client
const ossClient = new OSS({
  region: config.oss.region,
  accessKeyId: config.oss.accessKeyId,
  accessKeySecret: config.oss.accessKeySecret,
  bucket: config.oss.bucket,
});

// Directory to upload
const DIST_DIR = path.resolve(__dirname, '../dist');

/**
 * Recursively get all files in a directory
 * @param {string} dir - Directory to scan
 * @param {string} baseDir - Base directory for relative paths
 * @returns {Array<string>} Array of file paths
 */
function getAllFiles(dir, baseDir = dir) {
  const files = [];
  
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      files.push(...getAllFiles(filePath, baseDir));
    } else {
      files.push(filePath);
    }
  });
  
  return files;
}

/**
 * Upload a file to OSS
 * @param {string} filePath - Path to the file
 * @param {string} baseDir - Base directory for relative paths
 * @returns {Promise<void>}
 */
async function uploadFile(filePath, baseDir) {
  const relativePath = path.relative(baseDir, filePath).replace(/\\/g, '/');
  const contentType = mime.lookup(filePath) || 'application/octet-stream';
  
  try {
    await ossClient.put(relativePath, filePath, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': getCacheControl(filePath),
      },
    });
    console.log(`Uploaded: ${relativePath}`);
  } catch (error) {
    console.error(`Failed to upload ${relativePath}: ${error.message}`);
    throw error;
  }
}

/**
 * Get appropriate Cache-Control header based on file type
 * @param {string} filePath - Path to the file
 * @returns {string} Cache-Control header value
 */
function getCacheControl(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  // HTML files - short cache time
  if (ext === '.html') {
    return 'public, max-age=3600'; // 1 hour
  }
  
  // JS and CSS files - medium cache time
  if (ext === '.js' || ext === '.css') {
    return 'public, max-age=86400'; // 1 day
  }
  
  // Images, fonts, etc. - longer cache time
  if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.woff', '.woff2', '.ttf', '.eot'].includes(ext)) {
    return 'public, max-age=2592000'; // 30 days
  }
  
  // Default
  return 'public, max-age=86400'; // 1 day
}

/**
 * Main function to upload all files
 */
async function uploadAllFiles() {
  try {
    console.log(`Starting upload to OSS bucket: ${config.oss.bucket}`);
    
    const files = getAllFiles(DIST_DIR);
    console.log(`Found ${files.length} files to upload`);
    
    // Upload files in batches to avoid overwhelming the connection
    const BATCH_SIZE = 10;
    for (let i = 0; i < files.length; i += BATCH_SIZE) {
      const batch = files.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map(file => uploadFile(file, DIST_DIR)));
      console.log(`Uploaded batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(files.length / BATCH_SIZE)}`);
    }
    
    console.log('Upload completed successfully');
    
    if (config.oss.cdnDomain) {
      console.log(`Your assets are available at: https://${config.oss.cdnDomain}`);
    } else {
      console.log(`Your assets are available at: https://${config.oss.bucket}.${config.oss.region}.aliyuncs.com`);
    }
  } catch (error) {
    console.error('Upload failed:', error);
    process.exit(1);
  }
}

// Run the upload process
uploadAllFiles();
