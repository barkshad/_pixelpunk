import React, { createContext, useContext, useState } from 'react';
import { SiteContent, Product, ArchiveItem } from '../types';
import { PRODUCTS, ARCHIVE_ITEMS } from '../constants';

interface CMSContextType {
  content: SiteContent;
  isLoading: boolean;
  updateHero: (hero: SiteContent['hero']) => Promise<void>;
  updateMarquee: (marquee: string[]) => Promise<void>;
  updateFomo: (fomo: string[]) => Promise<void>;
  upsertProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  upsertArchiveItem: (item: ArchiveItem) => Promise<void>;
  deleteArchiveItem: (id: string) => Promise<void>;
  resetToDefaults: () => Promise<void>;
}

const DEFAULT_CONTENT: SiteContent = {
  hero: {
    slogan: "CURATING THE FUTURE ARCHIVE",
    title: "Rare Archives. Modern Fits.",
    subtitle: "Stop wearing the same things as everyone else. We find unique, high-quality pieces from the past that look incredible in your closet today."
  },
  marquee: [
    "LIMITED: Each item is a singular record of history.",
    "JOIN THE ARCHIVE: Ownership grants access to private drops.",
    "URGENCY: Sold items are removed permanently from the public log."
  ],
  fomoMessages: [
    "A collector in Paris just viewed the Hybrid Blazer.",
    "Only 1 Archive Tee left in current stock.",
    "A styling request was just fulfilled for a client in Tokyo.",
    "New curated drops arriving this Friday.",
    "Verified: 98.4% of archive items never return after sale."
  ],
  products: PRODUCTS,
  archiveItems: ARCHIVE_ITEMS
};

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content] = useState<SiteContent>(DEFAULT_CONTENT);
  const [isLoading] = useState(false);

  // Pure static stubs
  const updateHero = async () => {};
  const updateMarquee = async () => {};
  const updateFomo = async () => {};
  const upsertProduct = async () => {};
  const deleteProduct = async () => {};
  const upsertArchiveItem = async () => {};
  const deleteArchiveItem = async () => {};
  const resetToDefaults = async () => {};

  return (
    <CMSContext.Provider value={{ 
      content, isLoading, updateHero, updateMarquee, updateFomo, 
      upsertProduct, deleteProduct, upsertArchiveItem, deleteArchiveItem,
      resetToDefaults
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) throw new Error('useCMS must be used within a CMSProvider');
  return context;
};