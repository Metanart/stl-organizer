import { createHash } from 'node:crypto'
import { createReadStream } from 'node:fs'

import { constants } from 'fs'
import { access, copyFile as copyFileBase, lstat, stat, unlink } from 'fs/promises'

async function exists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK)
    return true
  } catch {
    return false
  }
}

async function fileExists(path: string): Promise<boolean> {
  if (!(await exists(path))) return false
  try {
    const stats = await stat(path)
    return stats.isFile()
  } catch {
    return false
  }
}

async function directoryExists(path: string): Promise<boolean> {
  if (!(await exists(path))) return false
  try {
    const stats = await stat(path)
    return stats.isDirectory()
  } catch {
    return false
  }
}

async function symlinkExists(path: string): Promise<boolean> {
  if (!(await exists(path))) return false
  try {
    const stats = await lstat(path)
    return stats.isSymbolicLink()
  } catch {
    return false
  }
}

async function copyFile(source: string, destination: string, overwrite = false): Promise<boolean> {
  const flags = overwrite ? 0 : constants.COPYFILE_EXCL

  try {
    await copyFileBase(source, destination, flags)
    return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      `Failed to copy "${source}" → "${destination}": ${error?.message ?? String(error)}`,
      {
        cause: error
      }
    )
  }
}

async function deleteFile(path: string): Promise<boolean> {
  try {
    await unlink(path)
    return true
  } catch {
    return false
  }
}

export async function calculateHash(
  filePath: string,
  options: {
    algorithm?: 'sha256' | 'sha1' | 'md5'
    encoding?: 'hex' | 'base64'
    signal?: AbortSignal
  } = {}
): Promise<string> {
  const algorithm = options.algorithm ?? 'sha256'
  const encoding = options.encoding ?? 'hex'

  try {
    const hash = createHash(algorithm)
    const stream = createReadStream(filePath, { signal: options.signal })

    for await (const chunk of stream) {
      hash.update(chunk as Buffer)
    }

    return hash.digest(encoding)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      `Failed to hash "${filePath}" with ${algorithm}: ${error?.message ?? String(error)}`,
      { cause: error }
    )
  }
}

export const FilesService = { fileExists, directoryExists, symlinkExists, copyFile, deleteFile }
