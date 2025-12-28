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

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setContent(DEFAULT_CONTENT);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const updateHero = async (hero: SiteContent['hero']) => {
    setContent(prev => ({ ...prev, hero }));
  };

  const updateMarquee = async (marquee: string[]) => {
    setContent(prev => ({ ...prev, marquee }));
  };

  const updateFomo = async (fomoMessages: string[]) => {
    setContent(prev => ({ ...prev, fomoMessages }));
  };

  const upsertProduct = async (product: Product) => {
    setContent(prev => {
      const existingIdx = prev.products.findIndex(p => p.id === product.id);
      const newProducts = [...prev.products];
      if (existingIdx >= 0) {
        newProducts[existingIdx] = product;
      } else {
        newProducts.push(product);
      }
      return { ...prev, products: newProducts };
    });
  };

  const deleteProduct = async (id: string) => {
    setContent(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  };

  const upsertArchiveItem = async (item: ArchiveItem) => {
    setContent(prev => {
      const existingIdx = prev.archiveItems.findIndex(i => i.id === item.id);
      const newItems = [...prev.archiveItems];
      if (existingIdx >= 0) {
        newItems[existingIdx] = item;
      } else {
        newItems.push(item);
      }
      return { ...prev, archiveItems: newItems };
    });
  };

  const deleteArchiveItem = async (id: string) => {
    setContent(prev => ({
      ...prev,
      archiveItems: prev.archiveItems.filter(i => i.id !== id)
    }));
  };

  const resetToDefaults = async () => {
    if (confirm("Reset all site content to defaults? This will revert local changes.")) {
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