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
  /** true — заходить в директорию; false — пропустить целиком */
  dirPredicate?: (dirName: string) => boolean
  /** true — включать файл */
  filePredicate?: (fileName: string, fileSize: number) => boolean
  /** true — считать файл «ключевым» для дальнейшей обработки (счётчик keyFiles) */
  keyFilePredicate?: (fileName: string, fileSize: number) => boolean
}

export type WalkResult = {
  tree: DirectoryNode
  totalFiles: number // количество всех включённых файлов
  keyFiles: number // количество включённых «ключевых» файлов
  nonKeyFiles: number // totalFiles - keyFiles
}

// --- defaults ---
const defaultDirPredicate = makeDirPredicate(
  BLOCKED_DIR_NAMES,
  BLOCKED_DIR_PATTERNS,
  false // allowHidden
)

const defaultFilePredicate = makeFilePredicate(
  ['zip', 'rar', 'jpg', 'jpeg', 'png', 'webp', 'stl'],
  BLOCKED_FILE_NAMES,
  BLOCKED_FILE_PATTERNS,
  1,
  200 * 1024 * 1024
)

const defaultKeyFilePredicate = (fileName: string): boolean => {
  const ext = fileName.includes('.') ? fileName.split('.').pop()!.toLowerCase() : ''
  return ext === 'zip' || ext === 'rar'
}

export async function walkDirectoryTree(
  root: string,
  options: WalkOptions = {}
): Promise<WalkResult> {
  const {
    maxDepth,
    dirPredicate = defaultDirPredicate,
    filePredicate = defaultFilePredicate,
    keyFilePredicate = defaultKeyFilePredicate
  } = options

  const { tree, totalFiles, keyFiles } = await walkInternal(root, 0)
  return { tree, totalFiles, keyFiles, nonKeyFiles: totalFiles - keyFiles }

  async function walkInternal(
    currentDir: string,
    depth: number
  ): Promise<{ tree: DirectoryNode; totalFiles: number; keyFiles: number }> {
    const entries = await readdir(currentDir, { withFileTypes: true })

    const files: FileNode[] = []
    const subdirs: DirectoryNode[] = []

    let total = 0
    let key = 0

    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name)

      if (entry.isDirectory()) {
        if (maxDepth != null && depth >= maxDepth) continue
        if (!dirPredicate(entry.name)) continue

        const child = await walkInternal(fullPath, depth + 1)
        subdirs.push(child.tree)
        total += child.totalFiles
        key += child.keyFiles
      } else if (entry.isFile()) {
        const s = await stat(fullPath)
        if (!filePredicate(entry.name, s.size)) continue

        const ext = extname(entry.name).slice(1).toLowerCase()
        files.push({
          path: fullPath,
          name: entry.name,
          size: s.size,
          ext
        })

        total += 1
        if (keyFilePredicate(entry.name, s.size)) key += 1
      }
      // TODO: обработка симлинков при необходимости
    }

    return {
      tree: {
        path: currentDir,
        name: basename(currentDir),
        files,
        subdirs
      },
      totalFiles: total,
      keyFiles: key
    }
  }
}
