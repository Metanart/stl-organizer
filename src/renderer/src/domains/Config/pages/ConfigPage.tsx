import { FC } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { ErrorFallback } from '@renderer/domains/Common/components/Generic/Error/ErrorFallback'
import { Page } from '@renderer/domains/Common/components/Page/Page'
import { PageContent } from '@renderer/domains/Common/components/Page/PageContent'
import { PageHeader } from '@renderer/domains/Common/components/Page/PageHeader'

import { ConfigContainer } from '../containers/ConfigContainer'

export const ConfigPage: FC = () => {
  const { t } = useTranslation('config')

  return (
    <Page>
      <PageHeader title={t('title')} />
      <PageContent>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ConfigContainer />
        </ErrorBoundary>
      </PageContent>
    </Page>
  )
}
