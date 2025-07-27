const escapeMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;'
}

export function escapeHTML(str: string): string {
  return str.replace(/[&<>"']/g, (c) => escapeMap[c])
}
