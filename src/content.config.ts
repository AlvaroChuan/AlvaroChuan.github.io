import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    category: z.enum(['tools', 'gameplay', 'research']),
    order: z.number().default(99),
    featured: z.boolean().default(false),
    tags: z.array(z.string()),
    engine: z.string(),
    language: z.string(),
    role: z.string(),
    timeline: z.string().optional(),
    links: z.object({
      steam: z.string().optional(),
      itch: z.string().optional(),
      github: z.string().optional(),
      paper: z.string().optional(),
      demo: z.string().optional(),
      studio: z.string().optional(),
      video: z.string().optional(),
      assetStore: z.string().optional(),
    }).optional(),
    image: z.string(),
    video: z.string().optional(),
    previewGif: z.string().optional(),
    gallery: z.array(z.string()).optional(),
  }),
});

export const collections = { projects };
