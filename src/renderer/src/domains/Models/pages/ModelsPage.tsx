import { FC } from 'react'
import { Page } from '@renderer/domains/Common/components/Page/Page'

import { ModelsContainer } from '../containers/ModelsContainer'

export const ModelsPage: FC = () => {
  return (
    <Page title="Models">
      <ModelsContainer />
    </Page>
  )
}
