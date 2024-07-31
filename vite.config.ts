import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/verify/",
  plugins: [
    react(),
    VitePWA({

      registerType: "prompt",
      injectRegister: false,
      includeAssets: ["**/*.{js,css,html,svg,png,ico}"],
      manifest: {
        name: "e-permit-verify",
        short_name: "e-permit-verify",
        description: "e-permit-verify",
        theme_color: "#ffffff",

        icons: [
          {
            src: "p-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "p-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: ({ url }) => true,
            //urlPattern: /^https:\/\/disapi\.uab\.gov\.tr\/apigateway\/test\/e-permit/i,
            handler: "CacheFirst",
            method: "GET",
            options: {
              cacheName: "all",
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 , // <== 1 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ], 
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});

// import process from "node:process";
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import type { ManifestOptions, VitePWAOptions } from "vite-plugin-pwa";
// import { VitePWA } from "vite-plugin-pwa";
// import replace from "@rollup/plugin-replace";

// const pwaOptions: Partial<VitePWAOptions> = {
//   //mode: "production",
//   //base: "/verify/",
//   includeAssets: ["**/*"],
//   manifest: {
//     name: "E-Permit Verification",
//     short_name: "E-Permit",
//     theme_color: "#ffffff",
//     icons: [
//       {
//         src: "p-192x192.png", // <== don't add slash, for testing
//         sizes: "192x192",
//         type: "image/png",
//       },
//       {
//         src: "favicon.svg", // <== don't add slash, for testing
//         sizes: "192x192",
//         type: "image/svg",
//       },
//       {
//         src: "p-512x512.png", // <== don't remove slash, for testing
//         sizes: "512x512",
//         type: "image/png",
//       },
//       {
//         src: "p-512x512.png", // <== don't add slash, for testing
//         sizes: "512x512",
//         type: "image/png",
//         purpose: "any maskable",
//       },
//     ],
//   },
//   workbox: {
//     cleanupOutdatedCaches: true,
//     clientsClaim: true,
//     globPatterns: ["**/*"],
//     runtimeCaching: [
//       {
//         urlPattern: /^https:\/\/disapi\.uab\.gov\.tr\/*/i,
//         handler: "CacheFirst",
//         method: 'GET',
//         options: {
//           cacheName: "verify",
//           expiration: {
//             maxAgeSeconds: 60 * 60 * 24 , // <== 1 day
//           },
//           cacheableResponse: {
//             statuses: [0, 200],
//           },
//         },

//       },
//     ],
//   },
//   devOptions: {
//     enabled: false,
//     suppressWarnings: true,

//     /* when using generateSW the PWA plugin will switch to classic */
//     type: "module",
//     navigateFallback: "index.html",

//   },
// };

// const replaceOptions = { __DATE__: new Date().toISOString() };

// pwaOptions.registerType = "autoUpdate";

// pwaOptions.selfDestroying = true;

// export default defineConfig({
//   plugins: [react(), VitePWA(pwaOptions), replace(replaceOptions)],
// });
