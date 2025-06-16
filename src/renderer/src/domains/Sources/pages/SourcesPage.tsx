import { FC, useState } from 'react'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { IconButton, Tooltip } from '@mui/material'
import { Page } from '@renderer/domains/Common/components/Page/Page'

import { SourcesAddNewContainer } from '../containers/SourcesAddNewContainer'
import { SourcesListContainer } from '../containers/SourcesListContainer'
import { SourceItemNew } from '../state/types'
import { useSourcesContext } from '../state/utils/hooks'

export const SourcesPage: FC = () => {
  const [showAddNew, setShowAddNew] = useState(false)

  const { create } = useSourcesContext()

  const handleToggleAddNew = (): void => {
    setShowAddNew((prevState) => {
      return !prevState
    })
  }

  const handleAddNewSource = (newItem: SourceItemNew): void => {
    create(newItem)
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
    <Page title="Source folders" actions={actions}>
      <SourcesListContainer />
      <SourcesAddNewContainer
        isOpen={showAddNew}
        onClose={handleToggleAddNew}
        onSave={handleAddNewSource}
      />
    </Page>
  )
}
