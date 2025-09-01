import { FC, useCallback } from 'react'
import { useI18nContext } from '@i18n/i18n-react.generated'
import { notify } from '@renderer/utils/notify'

import { createLog } from '@shared/utils/createLog'

import { useGetAllSourcesQuery } from '../api/useGetAllSourcesQuery'
import { useRemoveSourceMutation } from '../api/useRemoveSourceMutation'
import { SourcesDataGrid } from '../components/SourcesDataGrid/SourcesDataGrid'

const log = createLog({ category: 'RENDERER', tag: 'Sources' })

export const SourcesDataGridContainer: FC = () => {
  const { data: sourceFormDtos } = useGetAllSourcesQuery()
  const [removeSource, { isLoading: isRemoving }] = useRemoveSourceMutation()
  const { LL } = useI18nContext()

  const handleDelete = useCallback(
    async (id: string): Promise<void> => {
      if (!id) return

      try {
        await removeSource({ id }).unwrap()
        notify(LL.sources.dataGrid.notify.removed(), 'success')
      } catch (error) {
        const errorMessage = String(error)
        log.error(errorMessage || LL.sources.dataGrid.notify.failedRemove(), error)
        notify(errorMessage || LL.sources.dataGrid.notify.failedRemove(), 'error')
      }
    },
    [removeSource, LL]
  )

  return (
    <SourcesDataGrid
      sources={sourceFormDtos || []}
      onDelete={handleDelete}
      onEdit={() => null}
      onToggleEnabled={() => null}
      isLoading={isRemoving}
    />
  )
}
