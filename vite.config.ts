import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Plain client-side SPA: `vite build` emits static files to dist/.
// Deep links (e.g. /app) are rewritten to index.html by vercel.json.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    dedupe: ["react", "react-dom"],
  },
  server: {
    host: true,
    port: 8080,
  },
  build: {
    outDir: "dist",
  },
});
