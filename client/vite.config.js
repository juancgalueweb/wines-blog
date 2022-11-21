import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "build",
  },
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
  server: {
    port: 3000,
    origin: "http://127.0.0.1:8000",
    host: "0.0.0.0",
    proxy: {
      // forward `/uploads/` endpoint to -> `http://localhost:3000/uploads/`
      "^/uploads": {
        target: "http://localhost:3000/",
      },
    },
  },
});
