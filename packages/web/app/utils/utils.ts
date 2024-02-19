export function concatClassNames(a: string, b: string, ...args: string[]) {
  return [a, b, ...args].join(" ");
}