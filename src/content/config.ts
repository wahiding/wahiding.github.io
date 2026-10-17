import { defineCollection, z } from 'astro:content';

const novel = defineCollection({
  type: 'content',
  schema: z.object({
    chapter: z.number(),
    label: z.string(),
    title: z.string(),
  }),
});

export const collections = { novel };
