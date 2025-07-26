export function shrinkSpaces(str: string): string {
  return str
    .replace(/[\n\r\t]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}
