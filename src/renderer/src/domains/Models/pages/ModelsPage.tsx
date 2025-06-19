import { FC } from 'react'
import { Page } from '@renderer/domains/Common/components/Page/Page'
import { PageContent } from '@renderer/domains/Common/components/Page/PageContent'
import { PageHeader } from '@renderer/domains/Common/components/Page/PageHeader'

import { ModelsContainer } from '../containers/ModelsContainer'

export const ModelsPage: FC = () => {
  return (
    <Page>
      <PageHeader title={'Models'} />
      <PageContent>
        <ModelsContainer />
      </PageContent>
    </Page>
  )
}
