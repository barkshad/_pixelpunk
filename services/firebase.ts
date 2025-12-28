
import { initializeApp, getApp, getApps } from 'firebase/app';
import { FIREBASE_CONFIG } from './config';

// Import everything from firestore in this central module.
// This ensures the side-effects for service registration run correctly.
import { 
  getFirestore, 
  doc, 
  collection, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';

// 1. Initialize Firebase App (Singleton check)
const app = getApps().length === 0 ? initializeApp(FIREBASE_CONFIG) : getApp();

// 2. Initialize Firestore. This is guaranteed to work because the import above has run.
const db = getFirestore(app);

// 3. Define and export collection/document references
export const siteContentDoc = doc(db, 'site_content', 'main');
export const productsCol = collection(db, 'products');
export const archiveCol = collection(db, 'archive_items');

// 4. Export the initialized db instance and re-export all necessary Firestore functions.
//    Other files will import exclusively from this module.
export { 
  db,
  doc, 
  collection, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  deleteDoc 
};
