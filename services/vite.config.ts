import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// Removed: import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
// Note: runtimeErrorOverlay() is removed from plugins list below.

// This configuration is adapted for a standard local development environment
// by removing Replit-specific plugins that are causing "Cannot find module" errors.

export default defineConfig({
  plugins: [
    react(),
    // runtimeErrorOverlay(), // Removed
  ],
  resolve: {
    alias: {
      // Assuming this file is in the root and paths are relative to the root:
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  // Ensure the base directory for client code is correct:
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});