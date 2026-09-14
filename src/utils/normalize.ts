import path from "path";

export function normalize(url: string) {
  url = url.replace(import.meta.env.BASE_URL, "/");
  url = path.normalize(url);

  return url.length > 1 ? url.replace(/\/+$/, "") : url;
}
