import { FC } from 'react'

import { Page } from '../Common/Page'

import { SourceFoldersContainer } from './SourceFoldersContainer'

export const SourcesPage: FC = () => {
  return (
    <Page title="Sources">
      <SourceFoldersContainer />
    </Page>
  )
}
