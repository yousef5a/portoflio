import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-firebase": ["firebase/app", "firebase/firestore", "firebase/storage", "firebase/auth"],
          "vendor-ui": ["framer-motion", "react-icons"],
          "vendor-query": ["@tanstack/react-query", "react-hot-toast"],
        },
      },
    },
  },
});
