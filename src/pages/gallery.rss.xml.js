import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import galleryData from '../data/gallery.json';
import { getSlugById } from '../utils/slugs';

const images = import.meta.glob('../assets/gallery/*.{png,jpg,jpeg,gif,webp}', {
  eager: true,
});

const imageMap = new Map();
for (const [path, image] of Object.entries(images)) {
  const filename = path.split('/').pop();
  if (filename) {
    imageMap.set(filename, image.default);
  }
}

export async function GET(context) {
  const items = galleryData
    .sort((a, b) => b.btime - a.btime)
    .slice(0, 20)
    .map((item) => {
      const imageSource = imageMap.get(item.filename);
      const content = `
        <img 
          src="${context.site}${imageSource.src}" 
          alt="${item.name}"
          width="${item.width}"
          height="${item.height}"
        />
      `;
      return {
        title: item.name,
        description: item.description || '',
        link: `/gallery/${getSlugById(item.id)}/`,
        content,
        pubDate: new Date(item.btime).toISOString(),
      };
    });

  return rss({
    title: `Gallery - ${SITE_TITLE}`,
    description: SITE_DESCRIPTION,
    site: context.site,
    items,
  });
} 
