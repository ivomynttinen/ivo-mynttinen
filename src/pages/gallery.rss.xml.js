import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import galleryData from '../data/gallery.json';
import { getSlugById } from '../utils/slugs';

export async function GET(context) {
  const items = galleryData
    .sort((a, b) => b.lastModified - a.lastModified)
    .map((item) => ({
      title: item.name,
      description: item.description || '',
      link: `/gallery/${getSlugById(item.id)}/`,
      pubDate: new Date(item.lastModified).toISOString(),
    }));

  return rss({
    title: `Gallery - ${SITE_TITLE}`,
    description: SITE_DESCRIPTION,
    site: context.site,
    items,
  });
} 
