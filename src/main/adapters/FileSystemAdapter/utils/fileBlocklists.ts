// utils/fileBlocklists.ts

/** Жёстко заблокированные имена файлов (точное совпадение) */
export const BLOCKED_FILE_NAMES: string[] = [
  'Thumbs.db', // Windows thumbnail cache
  'ehthumbs.db', // Windows media cache
  'desktop.ini', // Windows настройки папок
  '.DS_Store', // macOS служебный файл
  'Icon\r', // macOS иконка папки
  '.gitignore',
  '.gitattributes',
  '.gitmodules',
  '.npmignore',
  '.editorconfig',
  '.env',
  'package-lock.json',
  'yarn.lock'
]

/** Регулярные выражения для гибкой фильтрации */
export const BLOCKED_FILE_PATTERNS: RegExp[] = [
  /^~\$.*$/, // временные файлы MS Office (~$file.docx)
  /^\.~lock\..*#$/, // временные файлы LibreOffice
  /^\.?cache/i, // .cache, cache.db и т.п.
  /^.*\.log$/i, // все .log файлы
  /^.*\.tmp$/i, // все .tmp файлы
  /^.*\.bak$/i, // backup-файлы
  /^.*\.swp$/i // vim swap files
]
