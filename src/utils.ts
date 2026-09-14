import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import path from "node:path";

export function normalize(url: string) {
  url = url.replace(import.meta.env.BASE_URL, "/");
  url = path.normalize(url);

  return url.length > 1 ? url.replace(/\/+$/, "") : url;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function api(path: string): string {
  return `https://backend-five-delta-42.vercel.app/api${path}`;
}
