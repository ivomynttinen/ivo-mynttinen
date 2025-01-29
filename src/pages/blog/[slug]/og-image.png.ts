import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage } from '../../../utils/og-image';

export const GET: APIRoute = async ({ params }) => {
  try {
    const posts = await getCollection('blog');
    const post = posts.find((post) => post.slug === params.slug);

    if (!post) {
      console.error(`Post not found for slug: ${params.slug}`);
      return new Response('Post not found', { status: 404 });
    }

    const png = await generateOgImage(post.data.title);
    
    return new Response(png, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (e) {
    console.error('Error generating OG image:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
};

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({ params: { slug: post.slug } }));
} 
