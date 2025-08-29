import { FC } from 'react'

import { useGetAllSourcesQuery } from '../api/useGetAllSourcesQuery'
import { SourcesDataGrid } from '../components/SourcesDataGrid/SourcesDataGrid'

export const SourcesDataGridContainer: FC = () => {
  const { data: sourceFormDtos } = useGetAllSourcesQuery()

  return (
    <SourcesDataGrid
      sources={sourceFormDtos || []}
      onDelete={() => null}
      onEdit={() => null}
      onToggleEnabled={() => null}
    />
  )
}
