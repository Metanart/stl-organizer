import { FC } from 'react'
import { Button, DialogActions } from '@mui/material'

type Props = {
  onClose?: () => void
  onSubmit?: () => void
  labelClose?: string
  labelSubmit?: string
  isSubmitDisabled?: boolean
}

export const ModalActions: FC<Props> = (props) => {
  const {
    labelClose = 'Cancel',
    labelSubmit = 'Submit',
    onClose,
    onSubmit,
    isSubmitDisabled
  } = props

  return (
    <DialogActions>
      {onClose && labelClose && (
        <Button onClick={onClose} color="secondary">
          {labelClose}
        </Button>
      )}

      {onSubmit && labelSubmit && (
        <Button onClick={onSubmit} variant="contained" color="primary" disabled={isSubmitDisabled}>
          {labelSubmit}
        </Button>
      )}
    </DialogActions>
  )
}
