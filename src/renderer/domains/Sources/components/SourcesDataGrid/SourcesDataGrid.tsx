import { FC, useMemo } from 'react'
import { Switch } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { SourceFormDTO } from '@shared/domains/Sources/Sources.dtos'

import { SourcesDataGridControls } from './SourcesDataGridControls'

type Props = {
  sources: SourceFormDTO[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onToggleEnabled: (id: string, value: boolean) => void
}

export const SourcesDataGrid: FC<Props> = ({ sources, onEdit, onDelete, onToggleEnabled }) => {
  const columns = useMemo<GridColDef<SourceFormDTO>[]>(
    () => [
      { field: 'name', headerName: 'Name', flex: 1, editable: false },
      { field: 'path', headerName: 'Path', flex: 2 },
      { field: 'comment', headerName: 'Comment', flex: 2 },
      {
        field: 'isEnabled',
        headerName: 'Enabled',
        flex: 1,
        renderCell: (params: GridRenderCellParams<SourceFormDTO, boolean>) => (
          <Switch
            checked={params.row.isEnabled}
            onChange={(_, value) => onToggleEnabled(params.row.id, value)}
          />
        )
      },
      {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        flex: 1,
        renderCell: (params: GridRenderCellParams<SourceFormDTO>) => (
          <SourcesDataGridControls
            onEdit={() => onEdit(params.row.id)}
            onDelete={() => onDelete(params.row.id)}
          />
        )
      }
    ],
    [onEdit, onDelete, onToggleEnabled]
  )

  return (
    <DataGrid<SourceFormDTO>
      rows={sources}
      columns={columns}
      getRowId={(row) => row.id}
      disableRowSelectionOnClick
    />
  )
}
