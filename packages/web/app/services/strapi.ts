// TODO: Change for environment variable
const API_URL = `http://10.6.0.5:1337`;
import qs from "qs";

export async function strapiGet(path: string, params?: {}) {
  let url = `${API_URL}${path}`;
  if(params){
    url += `?${qs.stringify(params)}`;

  }
  console.log(url);
  return await fetch(url);
}

export function strapiResourceUrl(path: string): string {
  return `http://localhost:1337${path}`;
}

export async function strapiPost(path: string,) {

}