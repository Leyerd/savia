import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// PWA para que se pueda instalar en PC y Android desde el navegador.
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "Savia — Nutrición & Entrenamiento",
        short_name: "Savia",
        description: "Lo que comes alimenta lo que entrenas. Nutrición + rutinas en casa, para Chile.",
        theme_color: "#FBFAF5",
        background_color: "#FBFAF5",
        display: "standalone",
        orientation: "portrait",
        start_url: "./",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2}"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
      }
    })
  ],
  server: { host: true, port: 5173 }
});
