import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    highlight: z.boolean().optional(),
    plain: z.boolean().optional(),
    category: z.enum(['general', 'archived', 'tech', 'design', 'code', 'life']).default('general'),
  }),
});

export const collections = { blog };
