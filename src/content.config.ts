import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const books = defineCollection({
  loader: glob({ base: 'src/content/books', pattern: '*.md' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    rating: z.number(),
    summary: z.string(),
  }),
});

const thoughts = defineCollection({
  loader: glob({ base: 'src/content/thoughts', pattern: '*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  books,
  thoughts,
};
