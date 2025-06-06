import { useState } from 'react'

import { SourceFoldersItem } from '../SourceFolders.types'

export const useSourceFoldersCreate = (): {
  createFolder: (folder: Partial<SourceFoldersItem>) => Promise<void>
  isLoading: boolean
  error?: string
} => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)

  const createFolder = async (folder: Partial<SourceFoldersItem>): Promise<void> => {
    setIsLoading(true)
    setError(undefined)

    try {
      const response = await window.api.sourceFolders.create(folder)

      if (!response.success) {
        throw new Error(response.error || 'Unknown error')
      }

      return response.data
    } catch (err) {
      console.error('[useSourceFoldersCreate]', err)
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return { createFolder, isLoading, error }
}
