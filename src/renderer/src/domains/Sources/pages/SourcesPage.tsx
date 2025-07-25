import { FC, useState } from 'react'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { IconButton, Tooltip } from '@mui/material'
import { Page } from '@renderer/domains/Common/components/Page/Page'
import { PageContent } from '@renderer/domains/Common/components/Page/PageContent'
import { PageHeader } from '@renderer/domains/Common/components/Page/PageHeader'

import { SourcesCreateContainer } from '../containers/SourcesCreateContainer'
import { SourcesListContainer } from '../containers/SourcesListContainer'

export const SourcesPage: FC = () => {
  const [showAddNew, setShowAddNew] = useState(false)

  console.log('SourcesPage')

  const handleToggleAddNew = (): void => {
    setShowAddNew((prevState) => {
      return !prevState
    })
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
        <SourcesCreateContainer isOpen={showAddNew} onClose={handleToggleAddNew} />
      </PageContent>
    </Page>
  )
}
