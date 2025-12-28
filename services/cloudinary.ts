import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { CLOUDINARY_CONFIG } from "./config";

/**
 * Optimizes a Cloudinary URL with auto-format and auto-quality.
 * @param url The original Cloudinary URL
 * @param width Optional width constraint
 */
export function optimizeCloudinaryUrl(url: string, width: number = 800): string {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  // Inject transformation parameters for optimization
  // f_auto: choose best format (avif/webp)
  // q_auto: balance quality and size
  const optimizationParams = `f_auto,q_auto,w_${width}`;
  
  if (url.includes('/upload/')) {
    return url.replace('/upload/', `/upload/${optimizationParams}/`);
  }
  return url;
}

/**
 * Uploads a file to Cloudinary and logs metadata to Firestore.
 * This does NOT store the file in Firebase Storage.
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  // 1. Prepare FormData for unsigned upload
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);

  try {
    // 2. Upload directly to Cloudinary CDN
    const response = await fetch(CLOUDINARY_CONFIG.uploadUrl, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Cloudinary upload failed");
    }

    const data = await response.json();
    const secureUrl = data.secure_url;

    // 3. Save reference metadata to Firestore (Media Index)
    // We strictly check for 'db' existence to prevent crashes if Firebase is in a weird state,
    // though Phase 1 stabilized this.
    if (db) {
      try {
        await addDoc(collection(db, "media"), {
          url: secureUrl,
          public_id: data.public_id,
          type: data.resource_type,
          format: data.format,
          bytes: data.bytes,
          createdAt: serverTimestamp()
        });
        console.debug("Media metadata logged to Firestore");
      } catch (firestoreError) {
        console.warn("Media uploaded, but Firestore log failed:", firestoreError);
        // We do not throw here; the upload was successful, just the log failed.
      }
    }

    return secureUrl;

  } catch (error) {
    console.error("Upload Service Error:", error);
    throw error;
  }
}
