import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Super Desafios Kids",
        short_name: "Desafios Kids",
        description: "Plataforma educativa para crianças dos 5 aos 10 anos.",
        theme_color: "#5b3cc4",
        background_color: "#f4f7ff",
        display: "standalone",
        lang: "pt-PT",
        start_url: "/",
        icons: [
          {
            src: "/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable"
          }
        ]
      }
    })
  ],
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts"
  }
});
