import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "zod";

const parser = (json: string) =>
  JSON.parse(json).map((item: any, index: number) => ({ ...item, id: index }));

const alumni = defineCollection({
  loader: glob({ pattern: "./*/data.json", base: "./content/alumni" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      batch: z.string(),
      message: z.string(),
      image: image(),
    }),
});

const links = defineCollection({
  loader: file("./content/links.json", { parser }),
  schema: z.object({ name: z.string(), href: z.string() }),
});

const socials = defineCollection({
  loader: file("./content/socials.json", { parser }),
  schema: z.object({ name: z.string(), icon: z.string(), href: z.string() }),
});

export const collections = { alumni, links, socials };
