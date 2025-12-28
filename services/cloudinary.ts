
/**
 * Optimizes a Cloudinary URL with auto-format and auto-quality.
 * @param url The original Cloudinary URL
 * @param width Optional width constraint
 */
export function optimizeCloudinaryUrl(url: string, width: number = 800): string {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  // Replace /upload/ with /upload/f_auto,q_auto,w_{width}/
  const optimizationParams = `f_auto,q_auto,w_${width}`;
  if (url.includes('/upload/')) {
    return url.replace('/upload/', `/upload/${optimizationParams}/`);
  }
  return url;
}

export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "real_unsigned");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/ds2mbrzcn/auto/upload",
    {
      method: "POST",
      body: formData
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Cloudinary upload failed");
  }

  const data = await response.json();
  return data.secure_url;
}