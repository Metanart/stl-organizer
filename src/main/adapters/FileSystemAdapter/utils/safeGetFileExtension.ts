export function safeGetFileExtension(fileName: string): string {
  if (!fileName || typeof fileName !== 'string') return ''
  const lastDotIndex = fileName.lastIndexOf('.')
  if (lastDotIndex === -1 || lastDotIndex === fileName.length - 1) return ''
  return fileName.slice(lastDotIndex + 1).toLowerCase()
}
