import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// This helper combines conditional classes (clsx) and merges conflicts (twMerge)
// Example: cn("bg-red-500", isPrimary && "bg-blue-500") -> "bg-blue-500" wins
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}