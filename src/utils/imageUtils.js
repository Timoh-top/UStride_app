import API_BASE_URL from "../api";

export const getImageUrl = (image) => {
  if (!image) return "/placeholder.png";

  if (typeof image !== "string") return "/placeholder.png";

  // already Cloudinary or full URL
  if (image.startsWith("http")) return image;

  // Django relative path fallback
  return `${API_BASE_URL}${image}`;
};