import { defineCollection, z } from 'astro:content';
import { THINGS_CATEGORIES } from '../consts';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    heroCode: z.string().optional(),
    ogImage: image().optional(),
    highlight: z.boolean().optional(),
    plain: z.boolean().optional(),
    category: z.enum(['general', 'archived', 'tech', 'design', 'code', 'life', 'site', 'travel', 'business']).default('general'),
  }),
});

const things = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    heroImage: image().optional(),
    ogImage: image().optional(),
    category: z.enum(THINGS_CATEGORIES).default('archive'),
    link: z.string().url().optional(),
  }),
});

export const collections = { blog, things };
