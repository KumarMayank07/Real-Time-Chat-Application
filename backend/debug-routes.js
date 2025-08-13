#!/usr/bin/env node

/**
 * Route Debugging Script
 *
 * This script helps identify which route is causing the path-to-regexp error
 */

import express from "express";

console.log("Testing route patterns for path-to-regexp compatibility...");

const app = express();

// Test basic routes first
try {
  console.log("Testing basic routes...");

  const testRouter = express.Router();

  // Test each route pattern individually
  const routePatterns = [
    "/users",
    "/:id",
    "/send/:id",
    "/signup",
    "/login",
    "/logout",
    "/check",
    "/update-profile",
  ];

  routePatterns.forEach((pattern, index) => {
    try {
      testRouter.get(pattern, (req, res) => res.json({ test: true }));
      console.log(`Route ${index + 1}: ${pattern} - OK`);
    } catch (error) {
      console.log(`Route ${index + 1}: ${pattern} - ERROR:`, error.message);
    }
  });

  console.log("Basic route patterns test completed");
} catch (error) {
  console.error("Error testing basic routes:", error.message);
}

// Test problematic patterns
try {
  console.log("\nTesting potentially problematic patterns...");

  const problematicPatterns = [
    "*",
    "/*",
    "/(.*)",
    "/api/*",
    "**",
    "/:",
    "/:/",
    "/:",
  ];

  problematicPatterns.forEach((pattern, index) => {
    try {
      const testApp = express();
      testApp.get(pattern, (req, res) => res.json({ test: true }));
      console.log(`Pattern ${index + 1}: ${pattern} - OK`);
    } catch (error) {
      console.log(
        `❌ Pattern ${index + 1}: ${pattern} - ERROR:`,
        error.message
      );
    }
  });
} catch (error) {
  console.error("Error testing problematic patterns:", error.message);
}

// Test route mounting
try {
  console.log("\nTesting route mounting...");

  const authRouter = express.Router();
  authRouter.post("/signup", (req, res) => res.json({ test: true }));
  authRouter.post("/login", (req, res) => res.json({ test: true }));
  authRouter.post("/logout", (req, res) => res.json({ test: true }));
  authRouter.get("/check", (req, res) => res.json({ test: true }));
  authRouter.put("/update-profile", (req, res) => res.json({ test: true }));

  const messageRouter = express.Router();
  messageRouter.get("/users", (req, res) => res.json({ test: true }));
  messageRouter.get("/:id", (req, res) => res.json({ test: true }));
  messageRouter.post("/send/:id", (req, res) => res.json({ test: true }));

  const testApp = express();
  testApp.use("/api/auth", authRouter);
  testApp.use("/api/message", messageRouter);

  console.log("Route mounting test completed");
} catch (error) {
  console.error("Error testing route mounting:", error.message);
  console.error("Stack trace:", error.stack);
}

console.log("\nRoute debugging completed!");
console.log(
  "If you see any ERROR messages above, those routes are causing the path-to-regexp issue."
);
