
import { ItemStatus, Product, ArchiveItem } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'PX-001',
    name: 'DECONSTRUCTED BLAZER // MOD-01',
    price: '$240',
    status: ItemStatus.AVAILABLE,
    category: 'Outerwear',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
    provenance: 'Sourced in Berlin, Friedrichshain district. 1990s silhouette reworked with heavy industrial stitching.',
    details: ['Hand-stitched seams', 'Oversized silhouette', 'Original brass hardware'],
    carbonSaved: '12.4kg',
    era: '1990S_REWORK'
  },
  {
    id: 'PX-002',
    name: 'CYBER-ARCHIVE UTILITY VEST',
    price: '$180',
    status: ItemStatus.SOLD,
    category: 'Vests',
    imageUrl: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=800&auto=format&fit=crop',
    provenance: 'London Archive. Original Japanese tech-wear found in a shuttered Camden workshop.',
    details: ['12-pocket system', 'Ballistic nylon', 'Adjustable harness'],
    carbonSaved: '8.2kg',
    era: 'EARLY_2000S'
  },
  {
    id: 'PX-003',
    name: 'GRAPHIC REWORK // GLITCH_CORE',
    price: '$145',
    status: ItemStatus.AVAILABLE,
    category: 'Tops',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
    provenance: 'Tokyo Street Find. Custom acid-wash performed in-house at _pixelpunk lab.',
    details: ['Acid-wash finish', 'Glitch screen-print', 'Heavy 400gsm cotton'],
    carbonSaved: '5.1kg',
    era: 'MODERN_REWORK'
  },
  {
    id: 'PX-004',
    name: 'VAULT_04 // DISTRESSED DENIM',
    price: '$210',
    status: ItemStatus.AVAILABLE,
    category: 'Bottoms',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop',
    provenance: 'Nairobi Market. Authentic vintage denim curated for its unique wear patterns and natural distressing.',
    details: ['Hand-finished edges', 'Vintage wash', 'Relaxed fit'],
    carbonSaved: '15.6kg',
    era: '1980S_ARCHIVE'
  }
];

export const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: 'arch-01',
    title: 'THE CORE EDIT',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop',
    description: 'Structural integrity through monochromatic layering.',
    date: 'OCT 2024',
    tags: ['MINIMAL', 'INDUSTRIAL']
  },
  {
    id: 'arch-02',
    title: 'NIGHT OPS',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    description: 'Urban nocturnal movements captured in technical silhouettes.',
    date: 'SEP 2024',
    tags: ['TECH', 'NIGHT']
  },
  {
    id: 'arch-03',
    title: 'GLITCH REALITY',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop',
    description: 'Borders between digital and physical fabrics.',
    date: 'AUG 2024',
    tags: ['ART', 'FASHION']
  }
];
