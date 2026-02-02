
/**
 * Optimizes image URLs by injecting Cloudinary transformation parameters.
 * @param {string} url - The original image URL.
 * @param {number} width - Target width for resizing (optional).
 * @returns {string} - The optimized URL.
 */
export const optimizeImage = (url, width = 800) => {
  if (!url) return '';
  
  // Check if it's a Cloudinary URL
  if (url.includes('cloudinary.com')) {
    // If it already has transformation params, just ensure auto format/quality
    // This regex looks for the /upload/ part and inserts params after it
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      // Add f_auto, q_auto, and optional width
      // c_limit ensures it doesn't upscale, only downscales
      const params = `f_auto,q_auto,c_limit,w_${width}`;
      return `${parts[0]}/upload/${params}/${parts[1]}`;
    }
  }
  
  return url;
};
