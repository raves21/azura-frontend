// vite.config.ts
import path from "path";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    viteReact(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "pwa-64x64.png",
        "pwa-512x512.png",
        "pwa-192x192.png",
        "pwa-180x180.png",
        "pwa-48x48.png",
        "azura-logo.svg",
      ],
      manifest: {
        name: "Azura",
        short_name: "Azura",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith("/api.themoviedb.org");
            },
            handler: "CacheFirst",
            options: {
              cacheName: "tmdb-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
    // ...,
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
