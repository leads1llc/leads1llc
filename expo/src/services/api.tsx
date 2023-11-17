const baseURL = 'http://localhost:1337';

export async function apiGet(path: string, data: Object) {
  const queryParams = Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&');
  return await fetch(`${baseURL}/api${path}?${queryParams}`);
}

export async function apiPost(path: string, data: Object) {
  return await fetch(`${baseURL}/api${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function apiResource(path: string): string {
  return `${baseURL}${path}`;
}
