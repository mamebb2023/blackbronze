import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertSize(kb: number) {
  if (kb >= 1024 * 1024) {
    return { value: (kb / (1024 * 1024)).toFixed(2), in: "GB" };
  } else if (kb >= 1024) {
    return { value: (kb / 1024).toFixed(2), in: "MB" };
  } else {
    return { value: kb.toFixed(2), in: "KB" };
  }
}


