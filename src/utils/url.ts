export const homeURL = import.meta.env.BASE_URL;
export const absoluteURL = import.meta.env.SITE + import.meta.env.BASE_URL;

export function getURL(path: string): string {
  return `${homeURL}${path.startsWith("/") ? path.substring(1) : path}`;
}

export function getAbsoluteURL(path: string): string {
  return `${absoluteURL}${path.startsWith("/") ? path.substring(1) : path}`;
}
