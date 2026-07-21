// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { satteri } from "@astrojs/markdown-satteri";

const isPages = process.env.GITHUB_ACTIONS === "true";
const isDev = process.env.NODE_ENV === "development";

export default defineConfig({
  site: isPages
    ? "https://goals-iitbhilai.github.io"
    : "https://goals.iitbhilai.ac.in",
  base: isPages ? "/goals.iitbhilai.ac.in" : "/",
  integrations: [icon(), isPages && rewritePaths()],

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

/** @returns {import("astro").AstroIntegration} */
function rewritePaths() {
  return {
    name: "rewrite-paths",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const { globby } = await import("globby");
        const fs = await import("node:fs/promises");

        const files = await globby("**/*.html", {
          cwd: dir.pathname,
          absolute: true,
        });

        await Promise.all(
          files.map(async (file) => {
            let html = await fs.readFile(file, "utf-8");
            html = html.replace(
              /(href|src|action)="\/(?!\/|goals\.iitbhilai\.ac\.in)/g,
              `$1="/goals.iitbhilai.ac.in/`,
            );
            await fs.writeFile(file, html);
          }),
        );
      },
    },
  };
}
