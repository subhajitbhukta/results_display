import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/igss": {
        target: "https://finaltsr.com", // Replace with your actual backend URL
        changeOrigin: true,
        secure: false,
        // If your backend API doesn't have /igss prefix, you can rewrite it:
        // rewrite: (path) => path.replace(/^\/igss/, '')
      },
    },
  },
});
