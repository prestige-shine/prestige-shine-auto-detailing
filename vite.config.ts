import { defineConfig } from "vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
 plugins: [
  tanstackStart(),
  netlify(),
  viteReact(),
  tailwindcss(),
  tsconfigPaths(),
],
});