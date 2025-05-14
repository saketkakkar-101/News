import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function convertToReadableDate(input) {
  let date;

  // Try to parse as a number (timestamp)
  if (!isNaN(Number(input))) {
    date = new Date(Number(input));
  } else {
    // Try to parse as ISO string
    date = new Date(input);
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  // Format options
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  
  };

  return date.toLocaleString("en-US", options);
}


