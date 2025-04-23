# Alibaba Cloud Deployment Guide

This document outlines the steps to deploy Cody's Cloud Arena on Alibaba Cloud services.

## Services Used

1. **Elastic Compute Service (ECS)**
   - Hosts the web application
   - Runs Node.js server for API endpoints

2. **Object Storage Service (OSS)**
   - Stores static assets (images, animations, etc.)
   - Configured for web hosting

3. **ApsaraDB for RDS**
   - MySQL database for game data
   - Stores player information, robot configurations, and battle results

4. **Content Delivery Network (CDN)**
   - Distributes content globally
   - Reduces latency for international players

5. **Function Compute**
   - Serverless functions for game logic
   - Handles leaderboard updates and battle calculations

## Deployment Steps

### 1. ECS Setup

1. Create an ECS instance:
   - Select a region close to your target audience
   - Choose Ubuntu 20.04 or later
   - Select at least 2 vCPUs and 4GB RAM
   - Enable public IP

2. Configure security groups:
   - Allow HTTP (80) and HTTPS (443)
   - Allow SSH (22) for administration

3. Connect to your instance and install dependencies:
   ```bash
   sudo apt update
   sudo apt install -y nodejs npm nginx certbot python3-certbot-nginx
   ```

4. Clone the repository:
   ```bash
   git clone https://github.com/northstarcoding/codys-cloud-arena.git
   cd codys-cloud-arena
   npm install
   npm run build
   ```

5. Configure Nginx:
   ```bash
   sudo nano /etc/nginx/sites-available/codys-cloud-arena
   ```

   Add the following configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /path/to/codys-cloud-arena/dist;
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
   }
   ```

6. Enable the site and secure it with SSL:
   ```bash
   sudo ln -s /etc/nginx/sites-available/codys-cloud-arena /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   sudo certbot --nginx -d your-domain.com
   ```

### 2. OSS Configuration

1. Create an OSS bucket:
   - Log in to the Alibaba Cloud console
   - Navigate to Object Storage Service
   - Create a bucket with a unique name
   - Enable static website hosting
   - Set appropriate permissions

2. Upload static assets:
   ```bash
   # Install OSS client
   pip install oss2

   # Upload assets
   python upload_assets.py
   ```

3. Configure CORS for the bucket to allow requests from your domain.

### 3. RDS Setup

1. Create an RDS instance:
   - Select MySQL 8.0 or later
   - Choose appropriate specifications based on expected load
   - Configure network settings to allow connections from your ECS instance

2. Create a database and user:
   ```sql
   CREATE DATABASE codys_cloud_arena;
   CREATE USER 'game_user'@'%' IDENTIFIED BY 'your-secure-password';
   GRANT ALL PRIVILEGES ON codys_cloud_arena.* TO 'game_user'@'%';
   FLUSH PRIVILEGES;
   ```

3. Run database migrations:
   ```bash
   node scripts/db-migrate.js
   ```

### 4. CDN Configuration

1. Create a CDN domain:
   - Log in to the Alibaba Cloud console
   - Navigate to CDN
   - Add a domain name
   - Set the origin server to your OSS bucket

2. Configure caching rules:
   - Set TTL for different file types
   - Configure HTTPS settings
   - Enable Gzip compression

3. Update your application to use CDN URLs for assets.

### 5. Function Compute Setup

1. Create a service:
   - Log in to the Alibaba Cloud console
   - Navigate to Function Compute
   - Create a new service
   - Configure appropriate permissions

2. Create functions for game logic:
   - Create functions for battle calculations, leaderboard updates, etc.
   - Set appropriate triggers (HTTP, event-driven)
   - Deploy function code

3. Update your application to call these functions.

## Monitoring and Maintenance

1. Set up CloudMonitor:
   - Configure alerts for CPU, memory, and disk usage
   - Set up custom metrics for game-specific monitoring

2. Configure logging:
   - Set up Log Service to collect and analyze logs
   - Create dashboards for important metrics

3. Implement backup strategy:
   - Configure automatic backups for RDS
   - Set up OSS versioning for assets

## Scaling Considerations

1. **Horizontal Scaling**:
   - Use Auto Scaling for ECS instances
   - Configure Server Load Balancer for multiple instances

2. **Database Scaling**:
   - Consider read replicas for RDS
   - Implement database sharding for high loads

3. **Global Deployment**:
   - Use Global Accelerator for improved global performance
   - Deploy to multiple regions for lower latency

## Cost Optimization

1. Use pay-as-you-go pricing initially
2. Monitor usage and switch to subscription pricing for predictable workloads
3. Implement resource scheduling to reduce costs during off-peak hours
4. Use OSS storage classes appropriately based on access patterns
