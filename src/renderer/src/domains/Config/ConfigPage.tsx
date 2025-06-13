import { FC } from 'react'

import { Page } from '../Common/Page'

import { ConfigContainer } from './ConfigContainer'

export const ConfigPage: FC = () => {
  return (
    <Page title="Config">
      <ConfigContainer />
    </Page>
  )
}
