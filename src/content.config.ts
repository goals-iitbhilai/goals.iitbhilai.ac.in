import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { describe, z } from "zod";
import { title } from "node:process";

function parser<T>(json: string) {
  return JSON.parse(json).map((item: T, index: number) => ({
    ...item,
    id: index,
  }));
}

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

const team = defineCollection({
  loader: glob({ pattern: "./*/data.json", base: "./content/team" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      post: z.string(),
      quote: z.string(),
      image: image(),
    }),
});

const links = defineCollection({
  loader: file("./content/links.json", { parser }),
  schema: z.object({ name: z.string(), href: z.string() }),
});

const socials = defineCollection({
  loader: file("./content/socials.json", { parser }),
  schema: z.object({
    name: z.string(),
    icon: z.string(),
    theme: z.string(),
    href: z.string(),
  }),
});

const pages = defineCollection({
  loader: file("./content/pages.json"),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { alumni, links, socials, team, pages };
