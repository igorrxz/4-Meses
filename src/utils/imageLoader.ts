import heic2any from 'heic2any';

export async function loadImage(imagePath: string): Promise<string> {
  // Check if the image is HEIC or HEIF format
  const isHeicOrHeif = /\.(heic|heif)$/i.test(imagePath);
  
  if (!isHeicOrHeif) {
    // For regular formats (JPG, PNG, WEBP), return the path directly
    return imagePath;
  }

  try {
    // Fetch the HEIC/HEIF file
    const response = await fetch(imagePath);
    const blob = await response.blob();

    // Convert HEIC/HEIF to JPEG
    const convertedBlob = await heic2any({
      blob,
      toType: 'image/jpeg',
      quality: 0.9,
    });

    // Create object URL from converted blob
    const blobToUse = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
    return URL.createObjectURL(blobToUse);
  } catch (error) {
    console.error('Error converting HEIC/HEIF image:', error);
    return imagePath; // Fallback to original path
  }
}