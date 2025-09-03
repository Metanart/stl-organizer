import { constants } from 'fs'
import { access, copyFile, lstat, mkdir, rename, stat, unlink } from 'fs/promises'

import { toAppError } from '@shared/utils/errors/AppError'
import { createLog } from '@shared/utils/logs/createLog'

import { walkDirectoryTree } from './walkDirectoryTree/walkDirectoryTree'
import { calculateHash } from './calculateHash'

const log = createLog({ tag: 'MAIN' })

async function exists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK)
    return true
  } catch {
    return false
  }
}

async function checkFileExists(path: string): Promise<boolean> {
  if (!(await exists(path))) return false
  try {
    const stats = await stat(path)
    return stats.isFile()
  } catch {
    return false
  }
}

async function checkDirectoryExists(path: string): Promise<boolean> {
  try {
    const stats = await stat(path)
    return stats.isDirectory()
  } catch {
    return false
  }
}

async function checkSymlinkExists(path: string): Promise<boolean> {
  if (!(await exists(path))) return false
  try {
    const stats = await lstat(path)
    return stats.isSymbolicLink()
  } catch {
    return false
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

async function checkDirectoryReadable(dirPath: string): Promise<boolean> {
  try {
    await access(dirPath, constants.R_OK)
    return true
  } catch {
    return false
  }
}

async function checkDirectoryWritable(dirPath: string): Promise<boolean> {
  try {
    await access(dirPath, constants.W_OK)
    return true
  } catch {
    return false
  }
}

async function createDir(dirPath: string, recursive = true): Promise<boolean> {
  try {
    await mkdir(dirPath, { recursive })
    return true
  } catch {
    return false
  }
}

async function copyFileSafe(
  source: string,
  destination: string,
  overwrite = false
): Promise<boolean> {
  const flags = overwrite ? 0 : constants.COPYFILE_EXCL

  try {
    await copyFile(source, destination, flags)
    return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = `Failed to copy "${source}" → "${destination}": ${error?.message ?? String(error)}`
    log.error(message)
    throw toAppError(error, {
      code: 'FILE_COPY_FAILED',
      domain: 'FILE_SYSTEM_ADAPTER',
      message
    })
  }
}

async function moveFile(source: string, destination: string): Promise<boolean> {
  try {
    await rename(source, destination)
    return true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = `Failed to move "${source}" → "${destination}": ${error?.message ?? String(error)}`

    // If rename fails due to cross-device link, fallback to copy+delete
    if (error.code === 'EXDEV') {
      try {
        await copyFile(source, destination)
        await deleteFile(source)
        return true
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (fallbackError: any) {
        throw toAppError(fallbackError, {
          code: 'FILE_MOVE_FALLBACK_FAILED',
          domain: 'FILE_SYSTEM_ADAPTER',
          message
        })
      }
    }

    throw toAppError(error, {
      code: 'FILE_MOVE_FAILED',
      domain: 'FILE_SYSTEM_ADAPTER',
      message
    })
  }
}

export const FileSystemAdapter = {
  checkFileExists,
  checkDirectoryExists,
  checkSymlinkExists,
  checkDirectoryReadable,
  checkDirectoryWritable,
  calculateHash,
  walkDirectoryTree,
  copyFileSafe,
  createDir,
  deleteFile,
  moveFile
}
