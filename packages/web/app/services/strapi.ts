// TODO: Change for environment variable
const API_URL = `http://10.6.0.5:1337`;

export async function strapiGet(path: string, params?: {}) {
  let url = `${API_URL}${path}`;
  if (params) {
    const search = Object.entries(params).map((entry) => `${entry[0]}=${entry[1]}`).join('&');
    url += `?${search}`;
  }
  console.log(url);
  return await fetch(url);
}

export function strapiResourceUrl(path: string): string {
  return `${API_URL}${path}`;
}

export async function strapiPost(path: string,) {

}