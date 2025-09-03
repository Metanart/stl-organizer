export function removeControlChars(str: string): string {
  // eslint-disable-next-line no-control-regex
  return str.replace(/[\u0000-\u001F\u007F]/g, '')
}
