import type { AstroIntegration } from "astro";
import { globby } from "globby";
import fs from "node:fs/promises";

export function rewritePaths(): AstroIntegration {
  return {
    name: "rewrite-paths",
    hooks: {
      "astro:build:done": async ({ dir }) => {
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
