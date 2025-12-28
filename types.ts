
export enum ItemStatus {
  AVAILABLE = 'available',
  SOLD = 'sold'
}

export interface Product {
  id: string;
  name: string;
  price: string;
  status: ItemStatus;
  category: string;
  imageUrl: string;
  provenance: string;
  details: string[];
  carbonSaved: string;
  era: string;
}

export interface ArchiveItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  date: string;
  tags: string[];
}

export interface SiteContent {
  hero: {
    slogan: string;
    title: string;
    subtitle: string;
  };
  marquee: string[];
  fomoMessages: string[];
  products: Product[];
  archiveItems: ArchiveItem[];
}
