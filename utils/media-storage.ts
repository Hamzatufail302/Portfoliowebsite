// Utility functions for saving and retrieving media files

// Save an image to localStorage
export function saveImageToStorage(category: string, id: string, imageUrl: string) {
  try {
    // Get existing images from localStorage
    const savedImages = localStorage.getItem("portfolioImages");
    const images = savedImages ? JSON.parse(savedImages) : {};
    
    // Initialize category if it doesn't exist
    if (!images[category]) {
      images[category] = {};
    }
    
    // Save the image URL
    images[category][id] = imageUrl;
    
    // Save back to localStorage
    localStorage.setItem("portfolioImages", JSON.stringify(images));
    
    return true;
  } catch (error) {
    console.error("Error saving image to storage:", error);
    return false;
  }
}

// Get an image from localStorage
export function getImageFromStorage(category: string, id: string): string | null {
  try {
    const savedImages = localStorage.getItem("portfolioImages");
    if (savedImages) {
      const images = JSON.parse(savedImages);
      return images[category]?.[id] || null;
    }
    return null;
  } catch (error) {
    console.error("Error getting image from storage:", error);
    return null;
  }
}

// Get all images for a category
export function getAllImagesForCategory(category: string): Record<string, string> {
  try {
    const savedImages = localStorage.getItem("portfolioImages");
    if (savedImages) {
      const images = JSON.parse(savedImages);
      return images[category] || {};
    }
    return {};
  } catch (error) {
    console.error("Error getting images for category:", error);
    return {};
  }
} 