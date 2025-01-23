import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE } from '../../consts';

export async function GET(context) {
  const things = await getCollection('things');
  return rss({
    title: `Things - ${SITE_TITLE}`,
    description: `A curated collection of hardware, software, and tools I use and recommend.`,
    site: context.site,
    items: things.map((post) => ({
      ...post.data,
      link: `/things/${post.slug}/`,
    })),
  });
} 
