import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 45173,
  },
  build: {
    lib: {
      entry: "./lib/index.ts",
      name: "pc-stats-panel",
      fileName: "index",
    },
  },
  plugins: [
    mkcert(),
    dts({
      insertTypesEntry: true,
    }),
  ],
});
