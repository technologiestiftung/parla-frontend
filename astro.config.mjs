import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/edge";
// https://astro.build/config
export default defineConfig({
	// Enable React to support React JSX components.
	output: "server",
	adapter: vercel(),
	integrations: [react()],
});
