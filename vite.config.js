import { resolve } from "node:path"
import { defineConfig } from "vite"
import electron from "vite-plugin-electron";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    electron([
      {
        entry: "src/main/main.ts",
        vite: {
          build: {
            outDir: "dist"
          }
        }
      },
      {
        entry: "src/ipc/preload.ts",
        vite: {
          build: {
            outDir: "dist"
          }
        }
      }
    ])
  ],
  build: {
    minify: "esbuild",
    outDir: "./dist",
    emptyOutDir: true,
    copyPublicDir: false,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }

        warn(warning);
      },
      input: {
        index: resolve(__dirname, "index.html"),
      }
    },
  }
});
