import { FC } from 'react'
import { Page } from '@renderer/domains/Common/components/Page'

import { ConfigContainer } from '../containers/ConfigContainer'

export const ConfigPage: FC = () => {
  return (
    <Page title="Config">
      <ConfigContainer />
    </Page>
  )
}
