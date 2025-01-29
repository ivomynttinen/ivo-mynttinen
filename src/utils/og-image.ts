import satori from 'satori';
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load the fonts
const syne = readFileSync(join(process.cwd(), 'public', 'fonts', 'Syne-ExtraBold.ttf'));

// Add SVG background import
const ogBackground = readFileSync(join(process.cwd(), 'src', 'utils', 'og-image-background.svg'), 'utf-8');

export async function generateOgImage(title: string) {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          backgroundImage: `url("data:image/svg+xml;base64,${Buffer.from(ogBackground).toString('base64')}")`,
          backgroundSize: 'cover',
          padding: '4rem',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { 
                fontFamily: 'Syne',
                fontSize: 52,
                fontWeight: 800,
                color: '#262215',
                letterSpacing: -2,
                textAlign: 'left',
              },
              children: title,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Syne',
          data: syne,
          weight: 700,
          style: 'normal',
        }
      ],
    }
  );

  // Convert SVG to PNG using Sharp
  const png = await sharp(Buffer.from(svg))
    .toFormat('png')
    .toBuffer();

  return png;
} 
