import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileNameFromUrl(url: string): string {
  if (!url) return "Document";
  try {
    // Decode the URL in case it's encoded (e.g. %20 for spaces)
    const decodedUrl = decodeURIComponent(url);
    // Get the last segment
    const lastSegment = decodedUrl.split("/").pop() || "Document";
    // Remove extension
    const nameWithoutExtension = lastSegment.split(".").slice(0, -1).join(".") || lastSegment;
    // Replace hyphens and underscores with spaces
    const cleanName = nameWithoutExtension.replace(/[-_]/g, " ");
    // Convert to title case
    return cleanName
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } catch (error) {
    // Fallback to a simple split if decodeURIComponent fails
    console.error("Error formatting filename from URL:", error);
    const lastSegment = url.split("/").pop() || "Document";
    return lastSegment;
  }
}
