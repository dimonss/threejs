#!/usr/bin/env node
/**
 * @fileoverview Script to build the project and deploy dist folder to remote server
 * @requires node
 */

import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

// Load .env file if it exists
const envPath = join(rootDir, '.env');
if (existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Read deployment configuration from environment variables
const remoteHost = process.env.DEPLOY_REMOTE_HOST || 'root@chalysh.pro';
const remotePath = process.env.DEPLOY_REMOTE_PATH || '~/frontend/threejs/dist';

try {
  console.log('🔄 Switching to Node.js 24...');
  
  // Use nvm to switch to Node.js 24 and build in the same shell session
  // Source nvm first (it's a shell function, not a binary)
  execSync('source ~/.nvm/nvm.sh && nvm use 24 && npm run build', {
    cwd: rootDir,
    stdio: 'inherit',
    shell: '/bin/bash',
  });

  console.log('✅ Build completed successfully!');
  console.log('📤 Deploying files to remote server...');

  // Deploy using rsync
  // -a: archive mode (preserves permissions, timestamps, etc.)
  // -v: verbose
  // -z: compress during transfer
  // --delete: delete files on remote that don't exist locally
  // --exclude: exclude node_modules and other unnecessary files
  const rsyncCommand = `rsync -avz --delete --exclude='.git' --exclude='node_modules' ${distDir}/ ${remoteHost}:${remotePath}/`;

  execSync(rsyncCommand, {
    stdio: 'inherit',
  });

  console.log('✅ Deployment completed successfully!');
  console.log(`   Files deployed to: ${remoteHost}:${remotePath}`);
} catch (error) {
  console.error('❌ Error during build or deployment:', error.message);
  process.exit(1);
}

