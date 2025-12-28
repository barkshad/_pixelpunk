import React, { createContext, useContext, useState, useEffect } from 'react';
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

const STORAGE_KEY = 'pixelpunk_archive_cms_v1';

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
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  // Initial Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setContent(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved archive content", e);
      }
    }
    setIsLoading(false);
  }, []);

  // Helper to persist changes
  const saveToStorage = (newContent: SiteContent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    setContent(newContent);
  };

  const updateHero = async (hero: SiteContent['hero']) => {
    saveToStorage({ ...content, hero });
  };

  const updateMarquee = async (marquee: string[]) => {
    saveToStorage({ ...content, marquee });
  };

  const updateFomo = async (fomoMessages: string[]) => {
    saveToStorage({ ...content, fomoMessages });
  };

  const upsertProduct = async (product: Product) => {
    const newProducts = [...content.products];
    const index = newProducts.findIndex(p => p.id === product.id);
    if (index >= 0) {
      newProducts[index] = product;
    } else {
      newProducts.unshift(product);
    }
    saveToStorage({ ...content, products: newProducts });
  };

  const deleteProduct = async (id: string) => {
    saveToStorage({ ...content, products: content.products.filter(p => p.id !== id) });
  };

  const upsertArchiveItem = async (item: ArchiveItem) => {
    const newItems = [...content.archiveItems];
    const index = newItems.findIndex(i => i.id === item.id);
    if (index >= 0) {
      newItems[index] = item;
    } else {
      newItems.unshift(item);
    }
    saveToStorage({ ...content, archiveItems: newItems });
  };

  const deleteArchiveItem = async (id: string) => {
    saveToStorage({ ...content, archiveItems: content.archiveItems.filter(i => i.id !== id) });
  };

  const resetToDefaults = async () => {
    if (confirm("Reset all site content to defaults? This will overwrite your local changes.")) {
      localStorage.removeItem(STORAGE_KEY);
      setContent(DEFAULT_CONTENT);
    }
  };

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