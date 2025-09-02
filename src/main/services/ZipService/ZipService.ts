import type { Dirent, Stats } from 'node:fs'
import { createWriteStream } from 'node:fs'
import { mkdir, readdir, stat, unlink } from 'node:fs/promises'
import { dirname, join, posix as pathPosix } from 'node:path'

import StreamZip from 'node-stream-zip'
import * as yazl from 'yazl'

export interface ListZipOptions {
  password?: string
  signal?: AbortSignal
}

/**
 * Возвращает список путей файлов внутри ZIP (без директорий).
 * Использует node-stream-zip (async API).
 */
export async function listZip(
  archivePath: string,
  options: ListZipOptions = {}
): Promise<string[]> {
  if (options.signal?.aborted) throw new Error('Aborted')

  const zip = new StreamZip.async({
    file: archivePath,
    storeEntries: true
  })

  const abortHandler = (): void => {
    // Закрываем архив при отмене; ошибки закрытия игнорируем
    try {
      void zip.close()
    } catch {
      // ignore
    }
  }
  options.signal?.addEventListener('abort', abortHandler, { once: true })

  try {
    const entries = await zip.entries()
    const files = Object.values(entries)
      .filter((entry) => !entry.isDirectory)
      .map((entry) => entry.name)
    return files
  } finally {
    options.signal?.removeEventListener('abort', abortHandler)
    await zip.close()
  }
}

export interface ExtractZipOptions {
  password?: string
  signal?: AbortSignal
}

/** Распаковка всего ZIP-архива в указанный каталог */
export async function extractZip(
  archivePath: string,
  outputDirectory: string,
  options: ExtractZipOptions = {}
): Promise<void> {
  if (options.signal?.aborted) throw new Error('Aborted')

  await mkdir(outputDirectory, { recursive: true })

  const zip = new StreamZip.async({
    file: archivePath,
    storeEntries: true
  })

  const onAbort = (): void => {
    try {
      void zip.close()
    } catch {
      // ignore
    }
  }
  options.signal?.addEventListener('abort', onAbort, { once: true })

  try {
    await zip.extract(null, outputDirectory) // null → извлечь всё
  } finally {
    options.signal?.removeEventListener('abort', onAbort)
    await zip.close()
  }
}

export interface ZipDirectoryOptions {
  /** 'deflate' (по умолчанию) или 'store' (без сжатия) */
  compression?: 'deflate' | 'store'
  /** Фиксированное mtime для детерминируемых ZIP (по умолчанию 2000-01-01) */
  mtime?: Date
  /** Пропускать/включать файлы по своему правилу */
  filter?: (relativePath: string, stats: Stats) => boolean
  /** Игнорировать символические ссылки (по умолчанию true) */
  ignoreSymlinks?: boolean
  /** Отмена операции */
  signal?: AbortSignal
}

/**
 * Упаковывает каталог целиком в ZIP с помощью yazl.
 * Сохраняет пустые директории, нормализует пути ("/") и может быть детерминируемым.
 */
export async function archiveDirectory(
  inputDirectory: string,
  outputZipPath: string,
  options: ZipDirectoryOptions = {}
): Promise<void> {
  const compression = options.compression ?? 'deflate'
  const fixedMtime = options.mtime ?? new Date('2000-01-01T00:00:00Z')
  const ignoreSymlinks = options.ignoreSymlinks ?? true

  if (options.signal?.aborted) throw new Error('Aborted')

  await mkdir(dirname(outputZipPath), { recursive: true })

  // Собираем список директорий и файлов (относительные пути), лексикографически
  const { dirs, files } = await collectEntries(inputDirectory, {
    ignoreSymlinks,
    filter: options.filter
  })
  dirs.sort()
  files.sort()

  const zip = new yazl.ZipFile()
  const out = createWriteStream(outputZipPath)

  const abortHandler = (): void => {
    try {
      out.destroy(new Error('Aborted'))
      // Закрываем zip (end() идемпотентен); файл удалим в finally если оборвёмся
      zip.end()
    } catch {
      // ignore
    }
  }
  options.signal?.addEventListener('abort', abortHandler, { once: true })

  const completion = new Promise<void>((resolve, reject) => {
    out.once('error', reject)
    zip.outputStream.once('error', reject)
    out.once('close', () => resolve())
  })

  // Старт пайплайна
  zip.outputStream.pipe(out)

  try {
    // Пустые директории — чтобы они сохранились в архиве
    for (const d of dirs) {
      const entryName = toZipEntryName(d, true)
      zip.addEmptyDirectory(entryName, { mtime: fixedMtime })
    }

    // Файлы
    for (const f of files) {
      const entryName = toZipEntryName(f, false)
      const absPath = join(inputDirectory, f)
      const s = await stat(absPath)
      // compress: true -> deflate, false -> store
      zip.addFile(absPath, entryName, {
        mtime: fixedMtime,
        mode: s.mode,
        compress: compression === 'deflate'
      })
    }

    zip.end()
    await completion
  } catch (err) {
    // При неуспехе пробуем удалить частично созданный архив
    try {
      await unlink(outputZipPath)
    } catch {
      // ignore
    }
    throw err
  } finally {
    options.signal?.removeEventListener('abort', abortHandler)
  }
}

/** Рекурсивный сбор относительных путей директорий и файлов */
async function collectEntries(
  rootDir: string,
  opts: { ignoreSymlinks: boolean; filter?: (rel: string, s: Stats) => boolean }
): Promise<{ dirs: string[]; files: string[] }> {
  const dirs: string[] = []
  const files: string[] = []

  async function walk(currentRel: string): Promise<void> {
    const currentAbs = join(rootDir, currentRel)
    const dirents: Dirent[] = await readdir(currentAbs, { withFileTypes: true })

    // Если нет элементов и это не корень — сохранить пустую директорию
    if (dirents.length === 0 && currentRel !== '') {
      dirs.push(currentRel)
      return
    }

    // Сначала директории (чтобы сохранить их даже если пустые)
    for (const d of dirents.filter((d) => d.isDirectory())) {
      const rel = pathJoinRel(currentRel, d.name)
      // Сохраняем директорию, даже если она непустая (для совместимости некоторых распаковщиков)
      dirs.push(rel)
      await walk(rel)
    }

    // Файлы
    for (const f of dirents.filter((d) => d.isFile() || d.isSymbolicLink())) {
      if (f.isSymbolicLink() && opts.ignoreSymlinks) continue
      const rel = pathJoinRel(currentRel, f.name)
      const s = await stat(join(rootDir, rel))
      if (opts.filter && !opts.filter(rel, s)) continue
      files.push(rel)
    }
  }

  await walk('')
  return { dirs, files }
}

/** Нормализуем путь для ZIP: всегда "/" и добавляем "/" для директорий */
function toZipEntryName(relPath: string, isDir: boolean): string {
  const normalized = pathPosix.normalize(relPath).replace(/^\.?\//, '')
  return isDir ? (normalized.endsWith('/') ? normalized : normalized + '/') : normalized
}

/** POSIX join для относительных путей (независимо от ОС) */
function pathJoinRel(baseRel: string, name: string): string {
  return baseRel ? pathPosix.join(baseRel.replace(/\\/g, '/'), name) : name
}
