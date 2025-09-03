import path from 'path'

/**
 * Нормализует строковый путь:
 * - делает абсолютным
 * - убирает лишние сегменты
 * - приводит к прямым слэшам
 * - убирает хвостовой слэш (кроме корня)
 */
export function normalizePath(inputPath: string): string {
  if (!inputPath) {
    throw new Error('normalizePath: empty path')
  }

  // Приводим к абсолютному пути и нормализуем
  let normalized = path.resolve(inputPath)

  // Приводим все разделители к прямым слэшам
  normalized = normalized.replace(/\\/g, '/')

  // Убираем хвостовой слэш, если это не корень
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1)
  }

  return normalized
}
