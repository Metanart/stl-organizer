export type FileNode = {
  path: string
  name: string
  size: number
  ext: string
}

export type DirectoryNode = {
  path: string
  name: string
  files: FileNode[]
  subdirs: DirectoryNode[]
}

export type WalkOptions = {
  /** Максимальная глубина (0 — только корень, 1 — корень + его дети, и т.д.). Отсутствует — без ограничения */
  maxDepth?: number
  /** true — заходить в директорию; false — пропустить целиком */
  dirPredicate?: (dirName: string) => boolean
  /** true — включать файл */
  filePredicate?: (fileName: string, fileSize: number) => boolean
  /** true — считать файл «ключевым» для дальнейшей обработки (счётчик keyFiles) */
  keyFilePredicate?: (fileName: string, fileSize: number) => boolean
  /** Максимальное количество файлов для предотвращения переполнения памяти */
  maxFiles?: number
  /** Максимальная глубина рекурсии для предотвращения переполнения стека */
  maxRecursionDepth?: number
}

export type WalkResult = {
  tree: DirectoryNode
  totalFiles: number // количество всех включённых файлов
  keyFiles: number // количество включённых «ключевых» файлов
  nonKeyFiles: number // totalFiles - keyFiles
  errors: string[] // информация об ошибках, возникших во время обхода
}
