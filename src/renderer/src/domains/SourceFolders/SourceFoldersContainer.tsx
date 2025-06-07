import { FC } from 'react'

import { useSourceFoldersGetAll } from './SourceFoldersState/useSourceFoldersGetAll'
import { SourceFolders } from './SourceFolders'
import { SourceFoldersItem } from './SourceFolders.types'

export const SourceFoldersContainer: FC = () => {
  const { folders, isLoading } = useSourceFoldersGetAll()

  const staticFolders: SourceFoldersItem[] = [
    {
      id: 1,
      path: '/path/to/folder',
      isEnabled: true,
      sourceType: 'torrent'
    },
    {
      id: 2,
      path: '/path/to/folder',
      isEnabled: true,
      sourceType: 'manual'
    },
    {
      id: 3,
      path: '/path/to/folder',
      isEnabled: true,
      sourceType: 'download'
    }
  ]

  return <SourceFolders folders={isLoading || !folders ? staticFolders : folders} />
}
