import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, Product, ArchiveItem } from '../types';
import { PRODUCTS, ARCHIVE_ITEMS } from '../constants';
import { db, auth } from '../services/firebase';
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
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

// Helper for Local Storage Persistence
const STORAGE_KEY = 'pixelpunk_cms_v1';
const saveLocal = (data: SiteContent) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Local storage save failed", e);
  }
};

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // 1. Handle Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // If no user, trigger anonymous sign-in
        signInAnonymously(auth).catch((error) => {
            console.warn("Anonymous auth failed:", error.message);
            // Even if auth fails, we set a dummy user state to allow the app to 
            // proceed to 'fetchData' (which will fall back to local storage)
            setUser({ isAnonymous: true, uid: 'offline-fallback' });
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Fetch Data (Waits for User State)
  useEffect(() => {
    if (!user) return; // Wait for auth to settle

    const fetchData = async () => {
      setIsLoading(true);
      
      // Load Local Storage First (Instant UI)
      try {
        const localData = localStorage.getItem(STORAGE_KEY);
        if (localData) {
          const parsed = JSON.parse(localData);
          if (parsed && parsed.hero) {
            setContent(parsed);
          }
        }
      } catch (e) {
        console.warn("Failed to parse local storage", e);
      }

      // Then Try Cloud Sync
      try {
        if (!db) throw new Error("Firestore not initialized");

        // Fetch Global Config
        const configRef = doc(db, 'site_config', 'main');
        const configSnap = await getDoc(configRef);
        
        let hero = content.hero;
        let marquee = content.marquee;
        let fomoMessages = content.fomoMessages;

        if (configSnap.exists()) {
           const data = configSnap.data();
           if (data.hero) hero = data.hero;
           if (data.marquee) marquee = data.marquee;
           if (data.fomoMessages) fomoMessages = data.fomoMessages;
        }

        // Fetch Products
        const productsRef = collection(db, 'products');
        const productsSnap = await getDocs(productsRef);
        let products: Product[] = content.products;
        
        if (!productsSnap.empty) {
          products = productsSnap.docs.map(doc => doc.data() as Product);
        }

        // Fetch Archive Items
        const archiveRef = collection(db, 'archive_items');
        const archiveSnap = await getDocs(archiveRef);
        let archiveItems: ArchiveItem[] = content.archiveItems;
        
        if (!archiveSnap.empty) {
           archiveItems = archiveSnap.docs.map(doc => doc.data() as ArchiveItem);
        }

        const syncedContent = {
          hero,
          marquee,
          fomoMessages,
          products,
          archiveItems
        };

        setContent(syncedContent);
        saveLocal(syncedContent);

      } catch (error: any) {
        if (error.code === 'permission-denied') {
            console.warn("⚠️ Firestore Permission Denied. Using Local Storage. Ensure your Firestore Rules allow reads/writes for authenticated users.");
        } else {
            console.error("Firestore sync error:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // Runs when 'user' state changes (Auth Complete)

  // Update Wrappers: Update State -> Save Local -> Try Save Cloud

  const updateHero = async (hero: SiteContent['hero']) => {
    setContent(prev => {
        const next = { ...prev, hero };
        saveLocal(next);
        return next;
    });
    try { if(db) await setDoc(doc(db, 'site_config', 'main'), { hero }, { merge: true }); } catch(e) {}
  };

  const updateMarquee = async (marquee: string[]) => {
    setContent(prev => {
        const next = { ...prev, marquee };
        saveLocal(next);
        return next;
    });
    try { if(db) await setDoc(doc(db, 'site_config', 'main'), { marquee }, { merge: true }); } catch(e) {}
  };

  const updateFomo = async (fomoMessages: string[]) => {
    setContent(prev => {
        const next = { ...prev, fomoMessages };
        saveLocal(next);
        return next;
    });
    try { if(db) await setDoc(doc(db, 'site_config', 'main'), { fomoMessages }, { merge: true }); } catch(e) {}
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
      const next = { ...prev, products: newProducts };
      saveLocal(next);
      return next;
    });

    try { if(db) await setDoc(doc(db, 'products', product.id), product); } catch(e) {}
  };

  const deleteProduct = async (id: string) => {
    setContent(prev => {
        const next = { ...prev, products: prev.products.filter(p => p.id !== id) };
        saveLocal(next);
        return next;
    });
    try { if(db) await deleteDoc(doc(db, 'products', id)); } catch(e) {}
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
      const next = { ...prev, archiveItems: newItems };
      saveLocal(next);
      return next;
    });

    try { if(db) await setDoc(doc(db, 'archive_items', item.id), item); } catch(e) {}
  };

  const deleteArchiveItem = async (id: string) => {
    setContent(prev => {
        const next = { ...prev, archiveItems: prev.archiveItems.filter(i => i.id !== id) };
        saveLocal(next);
        return next;
    });
    try { if(db) await deleteDoc(doc(db, 'archive_items', id)); } catch(e) {}
  };

  const resetToDefaults = async () => {
    if (!confirm("Reset all content to defaults?")) return;
    
    setIsLoading(true);
    // 1. Reset Local
    setContent(DEFAULT_CONTENT);
    saveLocal(DEFAULT_CONTENT);

    // 2. Try Reset Cloud
    try {
        if (!db) return;
        
        await setDoc(doc(db, 'site_config', 'main'), {
             hero: DEFAULT_CONTENT.hero,
             marquee: DEFAULT_CONTENT.marquee,
             fomoMessages: DEFAULT_CONTENT.fomoMessages
        });

        const productsSnap = await getDocs(collection(db, 'products'));
        if (!productsSnap.empty) {
            const pBatch = writeBatch(db);
            productsSnap.docs.forEach((d) => pBatch.delete(d.ref));
            DEFAULT_CONTENT.products.forEach(p => pBatch.set(doc(db, 'products', p.id), p));
            await pBatch.commit();
        }

        const archiveSnap = await getDocs(collection(db, 'archive_items'));
        if (!archiveSnap.empty) {
            const aBatch = writeBatch(db);
            archiveSnap.docs.forEach((d) => aBatch.delete(d.ref));
            DEFAULT_CONTENT.archiveItems.forEach(i => aBatch.set(doc(db, 'archive_items', i.id), i));
            await aBatch.commit();
        }
    } catch (e: any) {
        console.warn("Cloud reset incomplete (permissions or network). Local reset successful.");
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