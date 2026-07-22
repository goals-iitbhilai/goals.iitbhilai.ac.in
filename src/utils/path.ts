import path from "node:path";

export function normalize(url: string) {
  url = url.replace(import.meta.env.BASE_URL, "/");
  url = path.normalize(url);
  return path.resolve(url);
}
