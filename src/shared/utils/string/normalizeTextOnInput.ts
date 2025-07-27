export function normalizeTextOnInput(value: string): string {
  if (!value) return ''
  return value
    .replace(/^\s+/, '') // убираем пробелы и табы в начале
    .replace(/\t/g, ' ') // табы → пробелы
}
