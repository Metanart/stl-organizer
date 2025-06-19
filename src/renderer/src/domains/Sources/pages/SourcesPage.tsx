import { FC, useState } from 'react'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { IconButton, Tooltip } from '@mui/material'
import { Page } from '@renderer/domains/Common/components/Page/Page'
import { PageContent } from '@renderer/domains/Common/components/Page/PageContent'
import { PageHeader } from '@renderer/domains/Common/components/Page/PageHeader'

import { SourcesAddNewContainer } from '../containers/SourcesAddNewContainer'
import { SourcesListContainer } from '../containers/SourcesListContainer'
import { useSourcesContext } from '../state/useSourcesContext'
import { SourceCreate } from '../types/Source.types'

export const SourcesPage: FC = () => {
  const [showAddNew, setShowAddNew] = useState(false)

  const { create } = useSourcesContext()

  const handleToggleAddNew = (): void => {
    setShowAddNew((prevState) => {
      return !prevState
    })
  }

  const handleAddNewSource = (source: SourceCreate): void => {
    create(source)
  }

  const actions = {
    sourcesAddNew: (
      <Tooltip title="Add new source folder">
        <IconButton onClick={handleToggleAddNew} color="info">
          <ControlPointIcon />
        </IconButton>
      </Tooltip>
    )
  }

  return (
    <Page>
      <PageHeader title={'Sources'} actions={actions} />
      <PageContent>
        <SourcesListContainer />
        <SourcesAddNewContainer
          isOpen={showAddNew}
          onClose={handleToggleAddNew}
          onSave={handleAddNewSource}
        />
      </PageContent>
    </Page>
  )
}
