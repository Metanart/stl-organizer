import { useEffect, useState } from 'react'

import { SourceFoldersItem } from '../SourceFolders.types'

export const useSourceFoldersGetAll = (): {
  folders: SourceFoldersItem[]
  isLoading: boolean
  error?: string
} => {
  const [folders, setFolders] = useState<SourceFoldersItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    const load = async (): Promise<void> => {
      try {
        const response = await window.api.sourceFolders.getAll()

        if (!response.success) {
          throw new Error(response.error || 'Unknown error')
        }

        setFolders(response.data || [])
      } catch (error) {
        console.error('[useSourceFoldersGetAll]', error)
        setError((error as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [])

  return { folders, isLoading, error }
}
