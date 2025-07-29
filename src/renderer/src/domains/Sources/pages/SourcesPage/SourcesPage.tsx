import { FC, useState } from 'react'
import { useI18nContext } from '@i18n/i18n-react.generated'
import { Modal } from '@renderer/domains/Common/components/Modal/Modal'
import { Page } from '@renderer/domains/Common/components/Page/Page'
import { PageContent } from '@renderer/domains/Common/components/Page/PageContent'
import { PageHeader } from '@renderer/domains/Common/components/Page/PageHeader'

import { SourcesCreateFormContainer } from '../../containers/SourcesCreateFormContainer'
import { SourcesListContainer } from '../../containers/SourcesListContainer'

import { SourcesPageActions } from './SourcesPageActions'

export const SourcesPage: FC = () => {
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false)

  const { LL } = useI18nContext()

  const handleToggleCreateModal = (): void => {
    setIsCreateFormVisible((prevState) => {
      return !prevState
    })
  }

  const actions = <SourcesPageActions onAddNew={handleToggleCreateModal} />

  return (
    <Page>
      <PageHeader title={LL.sources.pageTitle()} actions={actions} />
      <PageContent>
        <SourcesListContainer />
        <Modal
          title={LL.sources.createForm.title()}
          isOpen={isCreateFormVisible}
          onClose={handleToggleCreateModal}
        >
          <SourcesCreateFormContainer />
        </Modal>
      </PageContent>
    </Page>
  )
}
