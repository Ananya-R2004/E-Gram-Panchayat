import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  base: "./", 

  plugins: [
    react(),
    runtimeErrorOverlay(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },

  root: path.resolve(import.meta.dirname, "client"),

  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },

  server: {
    port: 5176,        // ✅ FINAL EDUCATION PORT
    strictPort: true,

    fs: {
      strict: true,
      deny: ["**/.*"],
    },

    proxy: {
      "/api": {
        target: "http://localhost:5003", 
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
