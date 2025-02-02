import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function KBtoMB(number: number) {
  // Convert KB to MB then return only 2 decimal places
  return (number / 1024).toFixed(1)
}

