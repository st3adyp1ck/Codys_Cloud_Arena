/**
 * Script to invalidate Alibaba Cloud CDN cache
 * 
 * This script invalidates the CDN cache after deployment to ensure
 * that users see the latest version of the application.
 */

const Core = require('@alicloud/pop-core');

// Load deployment configuration
const config = require('../deploy.config.js');

// Initialize CDN client
const client = new Core({
  accessKeyId: config.oss.accessKeyId,
  accessKeySecret: config.oss.accessKeySecret,
  endpoint: 'https://cdn.aliyuncs.com',
  apiVersion: '2018-05-10'
});

/**
 * Invalidate CDN cache for specific paths
 * @param {string} domain - CDN domain
 * @param {Array<string>} paths - Paths to invalidate
 * @returns {Promise<void>}
 */
async function invalidateCache(domain, paths) {
  try {
    console.log(`Invalidating CDN cache for domain: ${domain}`);
    
    const params = {
      ObjectPath: paths.join('\n'),
      ObjectType: 'File',
      DomainName: domain
    };
    
    const requestOption = {
      method: 'POST'
    };
    
    const result = await client.request('RefreshObjectCaches', params, requestOption);
    console.log('Cache invalidation request submitted successfully');
    console.log(`RefreshTaskId: ${result.RefreshTaskId}`);
  } catch (error) {
    console.error('Failed to invalidate CDN cache:', error.message);
    throw error;
  }
}

/**
 * Main function to invalidate CDN cache
 */
async function invalidateCDNCache() {
  try {
    if (!config.oss.cdnDomain) {
      console.log('No CDN domain specified in configuration. Skipping cache invalidation.');
      return;
    }
    
    // Paths to invalidate
    const pathsToInvalidate = [
      '/',                // Root path
      '/index.html',      // Main HTML file
      '/assets/*'         // All assets
    ];
    
    await invalidateCache(config.oss.cdnDomain, pathsToInvalidate);
    
    console.log('CDN cache invalidation completed successfully');
  } catch (error) {
    console.error('CDN cache invalidation failed:', error);
    process.exit(1);
  }
}

// Run the cache invalidation process
invalidateCDNCache();
