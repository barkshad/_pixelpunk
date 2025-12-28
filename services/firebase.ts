import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore, doc, collection, onSnapshot, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FIREBASE_CONFIG } from './config';

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(FIREBASE_CONFIG) : getApp();
const db = getFirestore(app);

// Document & Collection Refs
export const siteContentDoc = doc(db, 'site_content', 'main');
export const productsCol = collection(db, 'products');
export const archiveCol = collection(db, 'archive_items');

// Explicit re-exports for consistency
export { 
  db,
  doc, 
  collection, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  deleteDoc 
};