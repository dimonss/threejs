#!/usr/bin/env node
/**
 * @fileoverview Script to generate .env file from .env.example
 * @requires node
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');
const envExamplePath = join(rootDir, '.env.example');
const envPath = join(rootDir, '.env');

try {
  // Check if .env.example exists
  if (!existsSync(envExamplePath)) {
    console.error('❌ Error: .env.example file not found!');
    process.exit(1);
  }

  // Check if .env already exists
  if (existsSync(envPath)) {
    console.log('⚠️  Warning: .env file already exists!');
    console.log('   If you want to regenerate it, please delete the existing .env file first.');
    process.exit(0);
  }

  // Read .env.example
  const envExampleContent = readFileSync(envExamplePath, 'utf-8');

  // Write .env file
  writeFileSync(envPath, envExampleContent, 'utf-8');

  console.log('✅ Successfully generated .env file from .env.example');
  console.log('   Please review and update the values in .env as needed.');
} catch (error) {
  console.error('❌ Error generating .env file:', error.message);
  process.exit(1);
}

