import { FC } from 'react'

import { Source } from '@shared/domains/Sources/types'

import { SourceFolders } from '../components/Sources'

export const SourceFoldersContainer: FC = () => {
  const staticSources: Source[] = [
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

  return <SourceFolders sources={staticSources} />
}
