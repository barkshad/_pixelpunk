
import { ItemStatus, Product, ArchiveItem } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'PX-001',
    name: 'HYBRID BLAZER // ARCHIVE-01',
    price: '$240',
    status: ItemStatus.AVAILABLE,
    category: 'Outerwear',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
    provenance: 'Found in Berlin. A perfect 90s silhouette that works with modern tech-wear or casual street fits.',
    details: ['Heavy structured wool', 'Oversized modern fit', 'Refurbished original buttons'],
    carbonSaved: '12.4kg',
    era: 'VINTAGE_BASE'
  },
  {
    id: 'PX-002',
    name: 'URBAN COMMAND UTILITY VEST',
    price: '$180',
    status: ItemStatus.SOLD,
    category: 'Vests',
    imageUrl: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=800&auto=format&fit=crop',
    provenance: 'London Sourcing. A rare find that brings an industrial edge to a simple hoodie or tee.',
    details: ['Multi-functional pockets', 'Water-resistant nylon', 'Adjustable side straps'],
    carbonSaved: '8.2kg',
    era: 'EARLY_2000S'
  },
  {
    id: 'PX-003',
    name: 'LAB-REWORKED OVERSIZED TEE',
    price: '$145',
    status: ItemStatus.AVAILABLE,
    category: 'Tops',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
    provenance: 'Customized in-house. We took a heavy 80s cotton blank and gave it a modern digital-glitch wash.',
    details: ['Heavyweight 400gsm cotton', 'One-of-a-kind dye pattern', 'Dropped shoulder fit'],
    carbonSaved: '5.1kg',
    era: 'MODERN_HYBRID'
  },
  {
    id: 'PX-004',
    name: 'ARCHIVE_DENIM // WIDE LEG',
    price: '$210',
    status: ItemStatus.AVAILABLE,
    category: 'Bottoms',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop',
    provenance: 'Sourced for its incredible natural wash. These are the jeans modern brands try to copy, but can\'t.',
    details: ['Authentic raw aging', 'Straight wide-leg cut', 'Original reinforced rivets'],
    carbonSaved: '15.6kg',
    era: '1980S_RECOVERED'
  }
];

export const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: 'arch-01',
    title: 'THE MODERN ARCHIVE',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop',
    description: 'How to mix 40-year-old fabrics with today\'s sharpest silhouettes.',
    date: 'NOV 2024',
    tags: ['MIXING', 'STYLING']
  },
  {
    id: 'arch-02',
    title: 'STREET ORIGINS',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    description: 'Tracking the evolution of utility gear from the factory to the city.',
    date: 'OCT 2024',
    tags: ['UTILITY', 'HISTORY']
  },
  {
    id: 'arch-03',
    title: 'DIGITAL FABRIC',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop',
    description: 'Exploring why vintage textures look so good in high-definition photos.',
    date: 'SEP 2024',
    tags: ['AESTHETIC', 'TEXTURE']
  }
];
