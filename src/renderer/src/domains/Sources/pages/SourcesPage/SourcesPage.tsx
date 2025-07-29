import { FC, useState } from 'react'
import { useI18nContext } from '@i18n/i18n-react.generated'
import { Modal } from '@renderer/domains/Common/components/Modal/Modal'
import { Page } from '@renderer/domains/Common/components/Page/Page'
import { PageContent } from '@renderer/domains/Common/components/Page/PageContent'
import { PageHeader } from '@renderer/domains/Common/components/Page/PageHeader'

import { useGetAllSourcesQuery } from '../../api/SourcesApi'
import { SourcesDataGrid } from '../../components/SourcesDataGrid/SourcesDataGrid'
import { SourcesCreateFormContainer } from '../../containers/SourcesCreateFormContainer'

import { SourcesPageActions } from './SourcesPageActions'

export const SourcesPage: FC = () => {
  const { data: sourceFormDtos, isLoading, error } = useGetAllSourcesQuery()

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
        <SourcesDataGrid
          sources={sourceFormDtos || []}
          onDelete={() => null}
          onEdit={() => null}
          onToggleEnabled={() => null}
        />
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
