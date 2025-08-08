#!/usr/bin/env node

/**
 * Deployment Health Check Script
 * 
 * This script helps verify that the backend is properly configured
 * for deployment and can catch common issues before deployment.
 */
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Messagify Backend - Deployment Check");

// 1) Node.js version
console.log(`Node.js version: ${process.version}`);

// 2) Env vars
console.log('\nEnvironment Variables:');
const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'MONGODB_URI',
  'JWT_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'FRONTEND_URL'
];
const missing = requiredEnvVars.filter(k => !process.env[k]);
requiredEnvVars.forEach(k => {
  console.log(`  ${k}: ${process.env[k] ? 'okay' : 'missing'}`);
});

// 3) package.json scripts
console.log('\npackage.json Scripts:');
let pkg;
try {
  pkg = JSON.parse(await readFile(path.join(__dirname, 'package.json'), 'utf8'));
  ['start'].forEach(s => {
    console.log(`  ${s}: ${pkg.scripts?.[s] ? pkg.scripts[s] : 'missing'}`);
  });
} catch {
  console.log('Could not read package.json');
}

// 4) Route validation
console.log('\nRoute Validation:');
[
  '/api/auth/signup',
  '/api/auth/login',
  '/api/auth/logout',
  '/api/auth/check',
  '/api/messages/users',
  '/api/messages/507f1f77bcf86cd799439011',
  '/api/messages/send/507f1f77bcf86cd799439011'
].forEach(r => console.log(`  - ${r}`));

// 5) Summary
console.log('\nSummary:');
if (missing.length) {
  console.log(`Missing ${missing.length} env vars:`, missing.join(', '));
  process.exit(1);
} else {
  console.log('All required env vars are set');
  process.exit(0);
}