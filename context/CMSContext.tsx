import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, Product, ArchiveItem } from '../types';
import { PRODUCTS, ARCHIVE_ITEMS } from '../constants';
import { db, auth } from '../services/firebase';
import { signInAnonymously } from "firebase/auth";
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  deleteDoc, 
  writeBatch 
} from 'firebase/firestore';

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

  // Fetch data from Firestore on mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!db) throw new Error("Firestore is not initialized");
        
        // Ensure user is authenticated anonymously to bypass basic security rules
        // We wrap this in a try/catch because if "Anonymous" provider is disabled in Firebase Console,
        // it throws 'auth/configuration-not-found'. We want to proceed anyway (might have public rules).
        if (!auth.currentUser) {
           try {
             await signInAnonymously(auth);
           } catch (authError: any) {
             console.warn("⚠️ Authentication Warning: Could not sign in anonymously.", authError.code);
             if (authError.code === 'auth/configuration-not-found' || authError.code === 'auth/admin-restricted-operation') {
                 console.warn("👉 ACTION REQUIRED: Go to Firebase Console > Authentication > Sign-in method > Enable 'Anonymous'.");
             }
             // We continue execution; maybe Firestore rules are public (allow read, write: if true;)
           }
        }

        // 1. Fetch Global Config (Hero, Marquee, Fomo)
        const configRef = doc(db, 'site_config', 'main');
        const configSnap = await getDoc(configRef);
        
        let hero = DEFAULT_CONTENT.hero;
        let marquee = DEFAULT_CONTENT.marquee;
        let fomoMessages = DEFAULT_CONTENT.fomoMessages;

        if (configSnap.exists()) {
           const data = configSnap.data();
           if (data.hero) hero = data.hero;
           if (data.marquee) marquee = data.marquee;
           if (data.fomoMessages) fomoMessages = data.fomoMessages;
        } else {
           // Seed initial config if it doesn't exist
           await setDoc(configRef, {
             hero: DEFAULT_CONTENT.hero,
             marquee: DEFAULT_CONTENT.marquee,
             fomoMessages: DEFAULT_CONTENT.fomoMessages
           });
        }

        // 2. Fetch Products
        const productsRef = collection(db, 'products');
        const productsSnap = await getDocs(productsRef);
        let products: Product[] = [];
        
        if (!productsSnap.empty) {
          products = productsSnap.docs.map(doc => doc.data() as Product);
        } else {
           // Seed initial products
           const batch = writeBatch(db);
           DEFAULT_CONTENT.products.forEach(p => {
             const ref = doc(db, 'products', p.id);
             batch.set(ref, p);
           });
           await batch.commit();
           products = DEFAULT_CONTENT.products;
        }

        // 3. Fetch Archive Items
        const archiveRef = collection(db, 'archive_items');
        const archiveSnap = await getDocs(archiveRef);
        let archiveItems: ArchiveItem[] = [];
        
        if (!archiveSnap.empty) {
           archiveItems = archiveSnap.docs.map(doc => doc.data() as ArchiveItem);
        } else {
           // Seed initial archive items
           const batch = writeBatch(db);
           DEFAULT_CONTENT.archiveItems.forEach(i => {
             const ref = doc(db, 'archive_items', i.id);
             batch.set(ref, i);
           });
           await batch.commit();
           archiveItems = DEFAULT_CONTENT.archiveItems;
        }

        setContent({
          hero,
          marquee,
          fomoMessages,
          products,
          archiveItems
        });

      } catch (error: any) {
        console.error("Failed to load CMS content from Firestore:", error);
        if (error.code === 'permission-denied') {
            console.warn("⚠️ PERMISSION DENIED: Please check your Firestore Security Rules in the Firebase Console. \nTry setting them to: \nallow read, write: if request.auth != null; \nOR (for public test mode) \nallow read, write: if true;");
        }
        // Fallback to defaults on error to keep app usable
        setContent(DEFAULT_CONTENT);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateHero = async (hero: SiteContent['hero']) => {
    setContent(prev => ({ ...prev, hero }));
    if (db) {
       await setDoc(doc(db, 'site_config', 'main'), { hero }, { merge: true });
    }
  };

  const updateMarquee = async (marquee: string[]) => {
    setContent(prev => ({ ...prev, marquee }));
    if (db) {
       await setDoc(doc(db, 'site_config', 'main'), { marquee }, { merge: true });
    }
  };

  const updateFomo = async (fomoMessages: string[]) => {
    setContent(prev => ({ ...prev, fomoMessages }));
    if (db) {
       await setDoc(doc(db, 'site_config', 'main'), { fomoMessages }, { merge: true });
    }
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

    if (db) {
      await setDoc(doc(db, 'products', product.id), product);
    }
  };

  const deleteProduct = async (id: string) => {
    setContent(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
    if (db) {
      await deleteDoc(doc(db, 'products', id));
    }
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

    if (db) {
      await setDoc(doc(db, 'archive_items', item.id), item);
    }
  };

  const deleteArchiveItem = async (id: string) => {
    setContent(prev => ({
      ...prev,
      archiveItems: prev.archiveItems.filter(i => i.id !== id)
    }));
    if (db) {
      await deleteDoc(doc(db, 'archive_items', id));
    }
  };

  const resetToDefaults = async () => {
    if (!confirm("Reset all site content to defaults? This will WIPE database changes and restore original content.")) return;
    
    setIsLoading(true);
    try {
        // Optimistic update
        setContent(DEFAULT_CONTENT);

        if (!db) return;

        // 1. Reset Global Config
        await setDoc(doc(db, 'site_config', 'main'), {
             hero: DEFAULT_CONTENT.hero,
             marquee: DEFAULT_CONTENT.marquee,
             fomoMessages: DEFAULT_CONTENT.fomoMessages
        });

        // 2. Reset Products (Delete all existing, then re-seed)
        const productsSnap = await getDocs(collection(db, 'products'));
        const pBatch = writeBatch(db);
        productsSnap.docs.forEach((d) => pBatch.delete(d.ref));
        DEFAULT_CONTENT.products.forEach(p => {
            const ref = doc(db, 'products', p.id);
            pBatch.set(ref, p);
        });
        await pBatch.commit();

        // 3. Reset Archive (Delete all existing, then re-seed)
        const archiveSnap = await getDocs(collection(db, 'archive_items'));
        const aBatch = writeBatch(db);
        archiveSnap.docs.forEach((d) => aBatch.delete(d.ref));
        DEFAULT_CONTENT.archiveItems.forEach(i => {
             const ref = doc(db, 'archive_items', i.id);
             aBatch.set(ref, i);
        });
        await aBatch.commit();

        console.log("Database reset complete.");
    } catch (e: any) {
        console.error("Reset failed", e);
        alert("Reset failed: " + e.message);
    } finally {
        setIsLoading(false);
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