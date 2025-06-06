import { useEffect, useState } from 'react'

import { SourceFoldersItem } from '../SourceFolders.types'

export const useSourceFoldersGetAll = (): {
  folders: SourceFoldersItem[] | null
  isLoading: boolean
} => {
  const [folders, setFolders] = useState<SourceFoldersItem[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async (): Promise<void> => {
      const result = await window.api.sourceFolders.getAll()
      setFolders(result)
      setIsLoading(false)
    }

    load()
  }, [])

  return { folders, isLoading }
}
