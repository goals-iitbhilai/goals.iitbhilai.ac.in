export const homeURL = import.meta.env.BASE_URL;

export function getURL(path: string): string {
  return `${import.meta.env.BASE_URL}${path.startsWith("/") ? path.substring(1) : path}`;
}
