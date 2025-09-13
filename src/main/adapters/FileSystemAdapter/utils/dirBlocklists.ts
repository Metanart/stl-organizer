/** Жёстко заблокированные имена папок (точное совпадение) */
export const BLOCKED_DIR_NAMES: string[] = [
  'node_modules',
  '.git',
  '.svn',
  '.hg',
  '.idea',
  '.vscode',
  '__MACOSX',
  '.DS_Store', // иногда попадается как папка на macOS
  'Thumbs.db', // Windows артефакт
  '.Trash', // macOS/Linux корзина
  'venv', // Python virtual env
  '.venv',
  'env',
  '.env',
  'dist',
  'build',
  'out',
  'coverage',
  '.cache'
]

/** Регулярные выражения для более гибкой фильтрации */
export const BLOCKED_DIR_PATTERNS: RegExp[] = [
  /^__pycache__$/i, // Python кэш
  /^backup/i, // backup, backups, Backup-old
  /^temp/i, // temp, tmp
  /^tmp$/i,
  /^log(s)?$/i, // log, logs
  /^cache$/i,
  /^\./ // скрытые папки, начинающиеся с "."
]
