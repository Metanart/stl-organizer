export function replaceNonBreakingSpaces(str: string): string {
  return str.replace(/\u00A0/g, ' ')
}
