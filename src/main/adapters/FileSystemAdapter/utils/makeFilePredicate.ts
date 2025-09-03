// utils/filePredicates.ts

/**
 * Создаёт предикат для фильтрации файлов.
 *
 * @param allowedExts список разрешённых расширений (без точки, в нижнем регистре). Если пусто → разрешить любые.
 * @param blockedNames список имён файлов для исключения (точное совпадение).
 * @param blockedPatterns список RegExp-шаблонов для исключения по имени.
 * @param minSize минимальный размер файла (байты). Если undefined → без ограничения.
 * @param maxSize максимальный размер файла (байты). Если undefined → без ограничения.
 */
export function makeFilePredicate(
  allowedExts: string[] = [],
  blockedNames: string[] = [],
  blockedPatterns: RegExp[] = [],
  minSize?: number,
  maxSize?: number
) {
  const allowedSet = new Set(allowedExts.map((e) => e.toLowerCase()))

  return (fileName: string, fileSize: number): boolean => {
    const ext = fileName.includes('.') ? fileName.split('.').pop()!.toLowerCase() : ''

    // 1. Проверка по имени
    if (blockedNames.includes(fileName)) return false

    // 2. Проверка по паттернам
    for (const pattern of blockedPatterns) {
      if (pattern.test(fileName)) return false
    }

    // 3. Проверка по расширению
    if (allowedSet.size > 0 && !allowedSet.has(ext)) return false

    // 4. Проверка по размеру
    if (minSize != null && fileSize < minSize) return false
    if (maxSize != null && fileSize > maxSize) return false

    return true
  }
}
