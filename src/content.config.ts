import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

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

export const collections = { alumni };
