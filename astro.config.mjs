// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import remarkSuperSub from "remark-supersub";

export default defineConfig({
  site: "https://goals.iitbhilai.ac.in",
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-inter",
      fallbacks: ["sans-serif"],
      weights: ["100 900"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Crimson Pro",
      cssVariable: "--font-crimson",
      fallbacks: ["serif"],
      styles: ["normal", "italic"],
      weights: ["200 900"],
    },
  ],
  markdown: {
    remarkPlugins: [
      /* @ts-ignore */
      [remarkSuperSub],
    ],
  },
});
