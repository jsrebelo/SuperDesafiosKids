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
                theme_color: "#ffffff",
                background_color: "#ffffff",
                display: "standalone",
                lang: "pt-PT",
                start_url: "/"
            }
        })
    ],
    test: {
        environment: "jsdom",
        setupFiles: "./src/tests/setup.ts"
    }
});
