import { FC } from 'react'
import { Page } from '@renderer/domains/Common/components/Page/Page'
import { PageContent } from '@renderer/domains/Common/components/Page/PageContent'
import { PageHeader } from '@renderer/domains/Common/components/Page/PageHeader'

import { ConfigContainer } from '../containers/ConfigContainer'

export const ConfigPage: FC = () => {
  console.log('ConfigPage')
  
  return (
    <Page>
      <PageHeader title={'Config'} />
      <PageContent>
        <ConfigContainer />
      </PageContent>
    </Page>
  )
}
