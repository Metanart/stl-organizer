import { FC } from 'react'
import { Page } from '@renderer/domains/Common/components/Page/Page'
import { PageContent } from '@renderer/domains/Common/components/Page/PageContent'
import { PageHeader } from '@renderer/domains/Common/components/Page/PageHeader'

import { Tasks } from '../components/Tasks'

export const TasksPage: FC = () => {
  return (
    <Page>
      <PageHeader title={'Tasks'} />
      <PageContent p={1}>
        <Tasks />
      </PageContent>
    </Page>
  )
}
