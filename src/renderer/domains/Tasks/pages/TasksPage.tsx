import { FC } from 'react'
import { useI18nContext } from '@i18n/i18n-react.generated'
import { Page } from '@renderer/domains/Common/components/Page/Page'
import { PageContent } from '@renderer/domains/Common/components/Page/PageContent'
import { PageHeader } from '@renderer/domains/Common/components/Page/PageHeader'

import { TasksDataGrid } from '../components/TasksDataGrid'

export const TasksPage: FC = () => {
  const { LL } = useI18nContext()

  return (
    <Page>
      <PageHeader title={LL.tasks.pageTitle()} />
      <PageContent>
        <TasksDataGrid />
      </PageContent>
    </Page>
  )
}
