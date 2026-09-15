import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import fs from "fs/promises";
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
  loader: async () => {
    const data = await fs
      .readFile("./content/links.json", { encoding: "utf8" })
      .then(JSON.parse);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((item: any, index: number) => ({
      id: index.toString(),
      ...item,
    }));
  },
  schema: z.discriminatedUnion("kind", [
    z.object({
      kind: z.literal("link"),
      name: z.string(),
      href: z.string(),
    }),
    z.object({
      kind: z.literal("group"),
      name: z.string(),
      items: z.array(
        z.object({
          kind: z.literal("link"),
          name: z.string(),
          href: z.string(),
        }),
      ),
    }),
  ]),
});

const socials = defineCollection({
  loader: file("./content/socials.json"),
  schema: z.object({
    icon: z.string(),
    theme: z.string(),
    href: z.string(),
  }),
});

const newsletters = defineCollection({
  loader: file("./content/newsletters.json"),
  schema: z.object({
    href: z.string(),
    drive: z.string(),
  }),
});

export const collections = { alumni, links, socials, team, newsletters };
