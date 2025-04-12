import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// lib/error-handling.ts
export function logError(error: unknown) {
  if (process.env.NODE_ENV === 'production') {
    // Send to error monitoring service
    console.error('Production Error:', error)
  } else {
    console.error('Development Error:', error)
  }
}






export const formatDate = (isoString: string, format: string = "YYYY-MM-DD") => {
  const date = new Date(isoString);

  const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
  } as const;

  if (format === "YYYY-MM-DD") {
      return date.toISOString().split("T")[0]; // "2025-03-26"
  } else if (format === "DD-MM-YYYY") {
      return date.toLocaleDateString("en-GB", options).replace(/\//g, "-"); // "26-03-2025"
  } else if (format === "MM/DD/YYYY") {
      return date.toLocaleDateString("en-US", options); // "03/26/2025"
  } else if (format === "Full Date") {
      return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }); 
      // "Wednesday, March 26, 2025"
  }

  return date.toDateString(); // Default: "Wed Mar 26 2025"
};

// // Example Usage
// console.log(formatDate("2025-03-26T00:00:00.000Z", "YYYY-MM-DD"));  // "2025-03-26"
// console.log(formatDate("2025-03-26T00:00:00.000Z", "DD-MM-YYYY"));  // "26-03-2025"
// console.log(formatDate("2025-03-26T00:00:00.000Z", "MM/DD/YYYY"));  // "03/26/2025"
// console.log(formatDate("2025-03-26T00:00:00.000Z", "Full Date"));   // "Wednesday, March 26, 2025"
