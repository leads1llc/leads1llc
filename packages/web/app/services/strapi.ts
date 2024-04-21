const API_URL = process.env.STRAPI_URL;
import qs from "qs";

export async function strapiGet(path: string, params?: {}) {
  let url = `${API_URL}${path}`;
  if (params) {
    url += `?${qs.stringify(params)}`;

  }
  return await fetch(url);
}

export function strapiResourceUrl(path: string): string {
  return `${API_URL}${path}`;
}

export async function strapiPost(path: string, params?: {}) {
  return await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: params })
  });
}
