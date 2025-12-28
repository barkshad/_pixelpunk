
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onSnapshot, setDoc, updateDoc, deleteDoc, doc, collection } from 'firebase/firestore';
import { SiteContent, Product, ArchiveItem } from '../types';
import { PRODUCTS, ARCHIVE_ITEMS } from '../constants';
import { db, siteContentDoc, productsCol, archiveCol } from '../services/firebase';

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

  // Sync with Firestore in Real-time
  useEffect(() => {
    // Listen to main site content (hero, marquee, fomo)
    const unsubMain = onSnapshot(siteContentDoc, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as Partial<SiteContent>;
        setContent(prev => ({ ...prev, ...data }));
      }
      setIsLoading(false);
    });

    // Listen to products
    const unsubProducts = onSnapshot(productsCol, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Product[];
      if (prods.length > 0) {
        setContent(prev => ({ ...prev, products: prods }));
      }
    });

    // Listen to archive items
    const unsubArchive = onSnapshot(archiveCol, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as ArchiveItem[];
      if (items.length > 0) {
        setContent(prev => ({ ...prev, archiveItems: items }));
      }
    });

    return () => {
      unsubMain();
      unsubProducts();
      unsubArchive();
    };
  }, []);

  const updateHero = async (hero: SiteContent['hero']) => {
    await setDoc(siteContentDoc, { hero }, { merge: true });
  };

  const updateMarquee = async (marquee: string[]) => {
    await setDoc(siteContentDoc, { marquee }, { merge: true });
  };

  const updateFomo = async (fomoMessages: string[]) => {
    await setDoc(siteContentDoc, { fomoMessages }, { merge: true });
  };

  const upsertProduct = async (product: Product) => {
    const productDoc = doc(db, 'products', product.id);
    await setDoc(productDoc, product);
  };

  const deleteProduct = async (id: string) => {
    const productDoc = doc(db, 'products', id);
    await deleteDoc(productDoc);
  };

  const upsertArchiveItem = async (item: ArchiveItem) => {
    const itemDoc = doc(db, 'archive_items', item.id);
    await setDoc(itemDoc, item);
  };

  const deleteArchiveItem = async (id: string) => {
    const itemDoc = doc(db, 'archive_items', id);
    await deleteDoc(itemDoc);
  };

  const resetToDefaults = async () => {
    if (confirm("Reset all site content to defaults? This will overwrite the database.")) {
      await setDoc(siteContentDoc, {
        hero: DEFAULT_CONTENT.hero,
        marquee: DEFAULT_CONTENT.marquee,
        fomoMessages: DEFAULT_CONTENT.fomoMessages
      });
      // Note: Full reset of collections (products/archive) would require batch deletes
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
