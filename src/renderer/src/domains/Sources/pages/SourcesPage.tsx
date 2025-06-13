import { FC } from 'react'

import { Page } from '../../Common/components/Page'
import { SourceFoldersContainer } from '../containers/SourcesContainer'

export const SourcesPage: FC = () => {
  return (
    <Page title="Sources">
      <SourceFoldersContainer />
    </Page>
  )
}
