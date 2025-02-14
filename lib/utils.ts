import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getToken() {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
}

export function convertSize(size: number, type: "B" | "K" = "K") {
  // Convert to KB if input is in Bytes
  const sizeInKB = type === "B" ? size / 1024 : size;

  if (sizeInKB >= 1024 * 1024) {
    return { value: (sizeInKB / (1024 * 1024)).toFixed(1), in: "GB" };
  } else if (sizeInKB >= 1024) {
    return { value: (sizeInKB / 1024).toFixed(1), in: "MB" };
  } else {
    return { value: sizeInKB.toFixed(1), in: "KB" };
  }
}


export function getTimeAgo(time: string | number): string {
  const timestamp = typeof time === "string" ? new Date(time).getTime() : time;
  const now = Date.now();
  const difference = now - timestamp;

  if (isNaN(difference)) return "Invalid date";

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years >= 1) return new Date(timestamp).toLocaleString();
  if (months > 0)
    return `${months} month${months !== 1 ? "s" : ""} and ${days % 30} day${
      days % 30 !== 1 ? "s" : ""
    } ago`;
  if (days > 0)
    return `${days} day${days !== 1 ? "s" : ""} and ${hours % 24} hr${
      hours % 24 !== 1 ? "s" : ""
    } ago`;
  if (hours > 0)
    return `${hours} hr${hours !== 1 ? "s" : ""} and ${minutes % 60} min ago`;
  if (minutes > 0) return `${minutes} min ago`;
  return `${seconds} sec ago`;
}
