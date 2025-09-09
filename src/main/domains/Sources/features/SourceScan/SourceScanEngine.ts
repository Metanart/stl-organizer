import { FileSystemAdapter } from '@main/adapters/FileSystemAdapter/FileSystemAdapter'

import { toAppError } from '@shared/utils/errors/AppError'

export class SourceScanEngine {
  async checkDirectoryExists(dir: string): Promise<boolean> {
    const isExists = await FileSystemAdapter.checkDirectoryExists(dir)

    if (!isExists) {
      throw toAppError(new Error('Directory not found'), {
        code: 'DIRECTORY_NOT_FOUND',
        domain: 'SOURCE_SCAN_ENGINE'
      })
    }

    return true
  }
}
