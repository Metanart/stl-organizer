/**
 * Создаёт предикат для фильтрации папок.
 *
 * @param blockedNames  список имён папок, которые нужно пропустить (точное совпадение)
 * @param blockedPatterns список RegExp-шаблонов, которым не должны соответствовать имена
 * @param allowHidden   включать ли скрытые папки (начинающиеся с ".")
 */
export function makeDirPredicate(
  blockedNames: string[] = [],
  blockedPatterns: RegExp[] = [],
  allowHidden = false
) {
  return (dirName: string): boolean => {
    // 1. Скрытые директории
    if (!allowHidden && dirName.startsWith('.')) return false

    // 2. Явно запрещённые имена
    if (blockedNames.includes(dirName)) return false

    // 3. Проверка по паттернам
    for (const pattern of blockedPatterns) {
      if (pattern.test(dirName)) return false
    }

    return true
  }
}
