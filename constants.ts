
import React from 'react';
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

// Re-writing POLICY_CONTENT to use React.createElement to fix syntax errors in a .ts file
export const POLICY_CONTENT: Record<string, React.ReactNode> = {
  authenticity: React.createElement('div', { className: "space-y-6" },
    React.createElement('p', null, "PixelPunk operates on a 100% Authenticity Guarantee. Every item entering our archive undergoes a rigorous three-stage verification process:"),
    React.createElement('ul', { className: "list-disc pl-5 space-y-2" },
      React.createElement('li', null, React.createElement('strong', null, "Structural Audit:"), " Verification of stitch count, seam construction, and hardware hallmarks."),
      React.createElement('li', null, React.createElement('strong', null, "Historical Cross-Reference:"), " Matching of labels and wash tags against known manufacturing era databases."),
      React.createElement('li', null, React.createElement('strong', null, "Provenance Logging:"), " Documentation of where the item was sourced and its estimated journey through the years.")
    ),
    React.createElement('p', null, "Items found to be non-original or of inferior manufacturing grade are immediately rejected. Your purchase is a certified historical artifact.")
  ),
  shipping: React.createElement('div', { className: "space-y-6" },
    React.createElement('p', null, "We treat every archive shipment with the respect a historical item deserves."),
    React.createElement('ul', { className: "list-disc pl-5 space-y-2" },
      React.createElement('li', null, React.createElement('strong', null, "Express Handling:"), " All items are processed within 48 hours."),
      React.createElement('li', null, React.createElement('strong', null, "Secure Packaging:"), " Items are wrapped in pH-neutral acid-free tissue to prevent any chemical aging during transit."),
      React.createElement('li', null, React.createElement('strong', null, "Global Tracking:"), " Comprehensive tracking provided for all international destinations via our priority courier network.")
    ),
    React.createElement('p', null, "Delivery typically takes 3-7 business days depending on your location relative to our nearest archive hub.")
  ),
  terms: React.createElement('div', { className: "space-y-6" },
    React.createElement('h4', { className: "text-white font-bold" }, "1. Exclusive Ownership"),
    React.createElement('p', null, "Archive items are unique. By completing a checkout, you acknowledge that you are securing a one-of-a-kind piece. Stock is not guaranteed until checkout completion."),
    React.createElement('h4', { className: "text-white font-bold" }, "2. Vintage Condition"),
    React.createElement('p', null, "You are purchasing \"Pre-Owned\" or \"Archive\" goods. Natural aging, patina, and minor imperfections are part of the item's history. We describe condition accurately, but perfection is never promised—history is messy."),
    React.createElement('h4', { className: "text-white font-bold" }, "3. Returns"),
    React.createElement('p', null, "Given the unique nature of these items, returns are accepted within 14 days in original, unworn condition with our security tags intact.")
  ),
  privacy: React.createElement('div', { className: "space-y-6" },
    React.createElement('p', null, "Your privacy is as protected as our archives. We do not sell your data."),
    React.createElement('p', null, "We collect only the information necessary to fulfill your request and secure your shipping. This includes email, name, and delivery coordinates. All transactions are encrypted with 256-bit bank-grade security protocols."),
    React.createElement('p', null, "Your history with us stays with us.")
  ),
  care: React.createElement('div', { className: "space-y-6" },
    React.createElement('p', null, "Vintage fabrics require a \"Low-Impact\" philosophy. We recommend:"),
    React.createElement('ul', { className: "list-disc pl-5 space-y-2" },
      React.createElement('li', null, React.createElement('strong', null, "Hand Wash Only:"), " Avoid heavy mechanical agitation."),
      React.createElement('li', null, React.createElement('strong', null, "Steam Over Iron:"), " High heat from an iron can flatten historical textures. Use gentle steam."),
      React.createElement('li', null, React.createElement('strong', null, "Breathable Storage:"), " Never store archive items in plastic bags for long periods. Use cotton garment bags.")
    )
  )
};
