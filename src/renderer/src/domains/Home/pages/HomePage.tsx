import { FC } from 'react'
import { Page } from '@renderer/domains/Common/components/Page/Page'
import { PageContent } from '@renderer/domains/Common/components/Page/PageContent'
import { PageHeader } from '@renderer/domains/Common/components/Page/PageHeader'

export const HomePage: FC = () => {
  return (
    <Page>
      <PageHeader title={'Home'} />
      <PageContent></PageContent>
    </Page>
  )
}
