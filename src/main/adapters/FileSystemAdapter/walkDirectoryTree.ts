import { readdir, stat } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'

import { BLOCKED_DIR_NAMES, BLOCKED_DIR_PATTERNS } from './utils/dirBlocklists'
import { BLOCKED_FILE_NAMES, BLOCKED_FILE_PATTERNS } from './utils/fileBlocklists'
import { makeDirPredicate } from './utils/makeDirPredicate'
import { makeFilePredicate } from './utils/makeFilePredicate'

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
  /**
   * Проверка: заходить ли в директорию (true — заходить).
   * Если вернёт false, директория полностью пропускается и не попадает в результат.
   */
  dirPredicate?: (dirName: string) => boolean
  /**
   * Проверка: включать ли файл (true — включать).
   * Если вернёт false, файл пропускается.
   */
  filePredicate?: (fileName: string, fileSize: number) => boolean
}

const defaultDirPredicate = makeDirPredicate(
  BLOCKED_DIR_NAMES,
  BLOCKED_DIR_PATTERNS,
  false // allowHidden: скрытые директории блокируются
)

const defaultFilePredicate = makeFilePredicate(
  ['zip', 'rar', 'jpg', 'jpeg', 'png', 'webp', 'stl'], // разрешённые расширения
  BLOCKED_FILE_NAMES,
  BLOCKED_FILE_PATTERNS,
  1, // minSize: >0 байт
  200 * 1024 * 1024 // maxSize: 200 MB
)

const defaultOptions: Required<Pick<WalkOptions, 'dirPredicate' | 'filePredicate'>> = {
  dirPredicate: defaultDirPredicate,
  filePredicate: defaultFilePredicate
}

export async function walkDirectoryTree(
  root: string,
  options: WalkOptions = {}
): Promise<DirectoryNode> {
  const {
    maxDepth,
    dirPredicate = defaultOptions.dirPredicate,
    filePredicate = defaultOptions.filePredicate
  } = options
  return walkInternal(root, 0)

  async function walkInternal(currentDir: string, depth: number): Promise<DirectoryNode> {
    const entries = await readdir(currentDir, { withFileTypes: true })

    const files: FileNode[] = []
    const subdirs: DirectoryNode[] = []

    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name)

      if (entry.isDirectory()) {
        // ограничение глубины
        if (maxDepth != null && depth >= maxDepth) continue
        // предикат директории
        if (!dirPredicate(entry.name)) continue

        const dirNode = await walkInternal(fullPath, depth + 1)
        subdirs.push(dirNode)
      } else if (entry.isFile()) {
        const s = await stat(fullPath)
        // предикат файла
        if (!filePredicate(entry.name, s.size)) continue

        files.push({
          path: fullPath,
          name: entry.name,
          size: s.size,
          ext: extname(entry.name).slice(1).toLowerCase()
        })
      }
      // при необходимости можно обработать симлинки отдельно:
      // else if (entry.isSymbolicLink()) { ... }
    }

    return {
      path: currentDir,
      name: basename(currentDir),
      files,
      subdirs
    }
  }
}
