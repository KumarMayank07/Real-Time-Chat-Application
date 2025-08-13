#!/usr/bin/env node

/**
 * Minimal Server for Debugging
 * 
 * This is a stripped-down version to identify the path-to-regexp issue
 */

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

console.log('Starting minimal server for debugging...');

// Basic middleware
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// Test routes one by one
console.log('Adding basic routes...');

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Minimal server running' });
});

// Auth routes
console.log('Adding auth routes...');
try {
  app.post('/api/auth/signup', (req, res) => {
    res.json({ message: 'Signup endpoint' });
  });
  
  app.post('/api/auth/login', (req, res) => {
    res.json({ message: 'Login endpoint' });
  });
  
  app.post('/api/auth/logout', (req, res) => {
    res.json({ message: 'Logout endpoint' });
  });
  
  app.get('/api/auth/check', (req, res) => {
    res.json({ message: 'Check endpoint' });
  });
  
  console.log('Auth routes added successfully');
} catch (error) {
  console.error('Error adding auth routes:', error.message);
}

// Message routes
console.log('Adding message routes...');
try {
  app.get('/api/message/users', (req, res) => {
    res.json({ message: 'Users endpoint' });
  });
  
  app.get('/api/message/:id', (req, res) => {
    res.json({ message: 'Get messages endpoint', id: req.params.id });
  });
  
  app.post('/api/message/send/:id', (req, res) => {
    res.json({ message: 'Send message endpoint', id: req.params.id });
  });
  
  console.log('Message routes added successfully');
} catch (error) {
  console.error('Error adding message routes:', error.message);
}

// Test catch-all route
console.log('Adding catch-all route...');
try {
  // Try different catch-all patterns
  app.get("*", (req, res) => {
    // If it was meant to be an API call, return 404:
    if (req.path.startsWith("/api/")) {
      return res.status(404).json({ error: "API endpoint not found" });
    }
    // Otherwise this is the SPA/fallback path:
    res.json({ message: "Catch-all route", path: req.path });
  });
  console.log("Catch-all route added successfully");
  
} catch (error) {
  console.error('Error adding catch-all route:', error.message);
  console.error('Stack trace:', error.stack);
}

// Error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error.message);
  console.error('Stack trace:', error.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
try {
  app.listen(PORT, () => {
    console.log(`Minimal server started on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`Test auth: http://localhost:${PORT}/api/auth/check`);
    console.log(`Test message: http://localhost:${PORT}/api/message/users`);
  });
} catch (error) {
  console.error('Error starting server:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}
