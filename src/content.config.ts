import { file, glob } from 'astro/loaders';
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

/* Resume: src/data/resume/*.yaml is the source of truth for /work. */
const resume = (name: string) => file(`src/data/resume/${name}.yaml`);
const month = z.coerce.date();

const experience = defineCollection({
  loader: resume('experience'),
  schema: z.object({
    company: z.string(),
    title: z.string(),
    team: z.string(),
    location: z.string(),
    start: month,
    end: month.optional(),
    stack: z.array(z.string()),
    highlights: z.array(
      z.object({
        label: z.string().optional(),
        text: z.string(),
        featured: z.boolean().default(false),
      }),
    ),
  }),
});

const projects = defineCollection({
  loader: resume('projects'),
  schema: z.object({
    name: z.string(),
    kind: z.string(),
    status: z.string().optional(),
    url: z.url().optional(),
    start: month.optional(),
    stack: z.array(z.string()),
    description: z.string(),
  }),
});

const awards = defineCollection({
  loader: resume('awards'),
  schema: z.object({
    title: z.string(),
    date: month,
    description: z.string(),
  }),
});

const education = defineCollection({
  loader: resume('education'),
  schema: z.object({
    school: z.string(),
    degree: z.string(),
    location: z.string(),
    start: month,
    end: month,
  }),
});

const skills = defineCollection({
  loader: resume('skills'),
  schema: z.object({
    label: z.string(),
    items: z.array(z.string()),
  }),
});

export const collections = {
  books,
  thoughts,
  experience,
  projects,
  awards,
  education,
  skills,
};
