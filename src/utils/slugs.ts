import galleryData from '../data/gallery.json';

// Helper function to generate URL-friendly slug
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Generate unique slugs for all items
export function createSlugMap() {
  const slugMap = new Map();
  galleryData.forEach(item => {
    let baseSlug = generateSlug(item.name);
    let slug = baseSlug;
    
    // If slug already exists, append part of the ID
    while (slugMap.has(slug)) {
      // Use first 6 characters of ID to keep URLs reasonably short
      slug = `${baseSlug}-${item.id.substring(0, 6)}`;
    }
    
    slugMap.set(slug, item);
  });
  return slugMap;
}

// Create and export a singleton instance of the slug map
export const slugMap = createSlugMap();

// Helper function to get slug by item ID
export function getSlugById(id: string): string | undefined {
  return Array.from(slugMap.entries()).find(([_, item]) => item.id === id)?.[0];
}

// Helper function to get item by slug
export function getItemBySlug(slug: string) {
  return slugMap.get(slug);
} 
