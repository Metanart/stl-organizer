import { FC, useState } from 'react'
import { Stack } from '@mui/material'

import { SourcesAddNew } from '../components/SourceAddNew'
import { SourcesList } from '../components/SourcesList'
import { SourceItem } from '../state/types'
import { useSourcesContext } from '../state/utils/hooks'

export const SourceFoldersContainer: FC = () => {
  const { sources, create } = useSourcesContext()

  const [isAddNewVisible, setIsAddNewVisible] = useState(true)

  const handleToggleAddNew = (): void => {
    setIsAddNewVisible((prevState) => {
      return !prevState
    })
  }

  const handleCreateNew = async (newSource: SourceItem): Promise<void> => {
    await create(newSource)
  }

  return (
    <Stack spacing={4}>
      <SourcesList sources={sources || []} onToggleAddNew={handleToggleAddNew} />

      {isAddNewVisible ? <SourcesAddNew onSubmit={handleCreateNew} /> : null}
    </Stack>
  )
}
