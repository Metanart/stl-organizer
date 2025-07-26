export function normalizeUnicode(str: string): string {
  return str.normalize('NFC')
}
