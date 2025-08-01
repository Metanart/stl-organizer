import { FC, Fragment } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton, Tooltip } from '@mui/material'

type Props = {
  onEdit: () => void
  onDelete: () => void
}

export const SourcesDataGridActions: FC<Props> = (props) => {
  const { onEdit, onDelete } = props

  return (
    <Fragment>
      <Tooltip title="Edit">
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Fragment>
  )
}
