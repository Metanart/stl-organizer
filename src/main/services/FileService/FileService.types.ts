import { constants } from 'fs'
import { access, copyFile, lstat, stat } from 'fs/promises'

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

async function copyFileSafe(source: string, destination: string, overwrite = false): Promise<void> {
  const flags = overwrite ? 0 : constants.COPYFILE_EXCL

  try {
    await copyFile(source, destination, flags)
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

export const FilesService = { fileExists, directoryExists, symlinkExists, copyFileSafe }
