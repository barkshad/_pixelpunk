
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore, doc, collection } from 'firebase/firestore';
import { FIREBASE_CONFIG } from './config';

/**
 * The "Service firestore is not available" error usually stems from:
 * 1. Version mismatches in the import map (e.g., app @ 10.8.0 and firestore @ 12.7.0).
 * 2. Calling getFirestore() before the firestore module has registered itself with the app instance.
 */

// 1. Initialize Firebase App (Singleton check)
const app = getApps().length === 0 ? initializeApp(FIREBASE_CONFIG) : getApp();

// 2. Initialize Firestore
// Pass 'app' explicitly to ensure the service is linked to the initialized app instance.
export const db = getFirestore(app);

// 3. Collection References
export const siteContentDoc = doc(db, 'site_content', 'main');
export const productsCol = collection(db, 'products');
export const archiveCol = collection(db, 'archive_items');
