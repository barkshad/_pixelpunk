
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, Product, ArchiveItem } from '../types';
import { PRODUCTS, ARCHIVE_ITEMS } from '../constants';

interface CMSContextType {
  content: SiteContent;
  updateHero: (hero: SiteContent['hero']) => void;
  updateMarquee: (marquee: string[]) => void;
  updateFomo: (fomo: string[]) => void;
  upsertProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  upsertArchiveItem: (item: ArchiveItem) => void;
  deleteArchiveItem: (id: string) => void;
  resetToDefaults: () => void;
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
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('pixelpunk_content');
    return saved ? JSON.parse(saved) : DEFAULT_CONTENT;
  });

  useEffect(() => {
    localStorage.setItem('pixelpunk_content', JSON.stringify(content));
  }, [content]);

  const updateHero = (hero: SiteContent['hero']) => setContent(prev => ({ ...prev, hero }));
  const updateMarquee = (marquee: string[]) => setContent(prev => ({ ...prev, marquee }));
  const updateFomo = (fomoMessages: string[]) => setContent(prev => ({ ...prev, fomoMessages }));

  const upsertProduct = (product: Product) => {
    setContent(prev => {
      const exists = prev.products.find(p => p.id === product.id);
      const newProducts = exists 
        ? prev.products.map(p => p.id === product.id ? product : p)
        : [product, ...prev.products];
      return { ...prev, products: newProducts };
    });
  };

  const deleteProduct = (id: string) => {
    setContent(prev => ({ ...prev, products: prev.products.filter(p => p.id !== id) }));
  };

  const upsertArchiveItem = (item: ArchiveItem) => {
    setContent(prev => {
      const exists = prev.archiveItems.find(i => i.id === item.id);
      const newArchive = exists 
        ? prev.archiveItems.map(i => i.id === item.id ? item : i)
        : [item, ...prev.archiveItems];
      return { ...prev, archiveItems: newArchive };
    });
  };

  const deleteArchiveItem = (id: string) => {
    setContent(prev => ({ ...prev, archiveItems: prev.archiveItems.filter(i => i.id !== id) }));
  };

  const resetToDefaults = () => {
    if (confirm("Reset all site content to defaults? This cannot be undone.")) {
      setContent(DEFAULT_CONTENT);
    }
  };

  return (
    <CMSContext.Provider value={{ 
      content, updateHero, updateMarquee, updateFomo, 
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
