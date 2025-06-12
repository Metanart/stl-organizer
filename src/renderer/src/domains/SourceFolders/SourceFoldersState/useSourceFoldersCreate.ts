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
      return response.data
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return { createFolder, isLoading, error }
}
