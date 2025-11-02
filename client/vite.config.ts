// Path: client/vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// __dirname is safer than import.meta.dirname for Node contexts
const __dirname = path.resolve();

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      // @ now points to ./src relative to the client folder
      "@": path.resolve(__dirname, "src"), 
      // @shared now points to ../shared (one level up from client)
      "@shared": path.resolve(__dirname, "../shared"), 
      // @assets now points to ../attached_assets (one level up from client)
      "@assets": path.resolve(__dirname, "../attached_assets"),
    },
  },
  // The root is now the client directory itself
  root: path.resolve(__dirname), 
  build: {
    // outDir must point to the 'dist/public' folder, which is one level up
    outDir: path.resolve(__dirname, "../dist/public"), 
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});