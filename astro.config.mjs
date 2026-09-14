// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { satteri } from "@astrojs/markdown-satteri";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import { rewritePaths } from "@integrations/rewrite-paths";

const isPages = process.env.GITHUB_ACTIONS === "true";
const isDev = process.env.NODE_ENV === "development";

export default defineConfig({
  site: isPages
    ? "https://goals-iitbhilai.github.io"
    : "https://goals.iitbhilai.ac.in",
  base: isPages ? "/goals.iitbhilai.ac.in" : "/",

  integrations: [icon(), sitemap(), svelte(), isPages && rewritePaths()],

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: isDev ? true : undefined,
    },
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-inter",
      fallbacks: ["sans-serif"],
      weights: ["200 700"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Crimson Pro",
      cssVariable: "--font-crimson",
      fallbacks: ["serif"],
      styles: ["normal", "italic"],
      weights: ["300 700"],
    },
  ],

  markdown: {
    processor: satteri({
      features: {
        subscript: true,
        superscript: true,
      },
    }),
  },
});
