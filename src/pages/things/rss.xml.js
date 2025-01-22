import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../../consts';

export async function GET(context) {
  const things = await getCollection('things');
  return rss({
    title: `${SITE_TITLE} | Things`,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: things.map((post) => ({
      ...post.data,
      link: `/things/${post.slug}/`,
    })),
  });
} 
