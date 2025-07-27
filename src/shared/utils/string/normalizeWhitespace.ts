export function normalizeWhitespace(str: string): string {
  return str
    .replace(/[\n\r\t]+/g, ' ') // переносы и табуляции → пробел
    .replace(/\s{2,}/g, ' ') // двойные пробелы → один
    .trim()
}
