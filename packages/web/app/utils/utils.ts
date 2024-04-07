export function concatClassNames(a: string, b: string, ...args: string[]) {
  return [a, b, ...args].join(" ");
}

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}