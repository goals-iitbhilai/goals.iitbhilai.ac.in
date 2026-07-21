import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "zod";

const alumni = defineCollection({
  loader: glob({ pattern: "./content/alumni/*/data.json" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      batch: z.string(),
      message: z.string(),
      image: image(),
    }),
});

const team = defineCollection({
  loader: glob({ pattern: "./content/team/*/data.json" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      post: z.string(),
      quote: z.string(),
      image: image(),
    }),
});

const links = defineCollection({
  loader: file("./content/links.json"),
  schema: z.object({
    href: z.string(),
    name: z.string(),
  }),
});

const socials = defineCollection({
  loader: file("./content/socials.json"),
  schema: z.object({
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

const newsletters = defineCollection({
  loader: file("./content/newsletters.json"),
  schema: z.object({
    href: z.string(),
    drive: z.string(),
  }),
});

export const collections = { alumni, links, socials, team, pages, newsletters };
