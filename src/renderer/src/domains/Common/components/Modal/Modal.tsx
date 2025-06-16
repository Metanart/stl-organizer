import { FC, ReactNode } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'

type Props = {
  isOpen: boolean
  title?: string
  children: ReactNode
  actions?: ReactNode
  onClose: () => void
}

export const Modal: FC<Props> = (props) => {
  const { isOpen, title, children, actions, onClose } = props

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      {title && (
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {title}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent sx={{ p: 0 }} dividers>
        {children}
      </DialogContent>

      {actions}
    </Dialog>
  )
}
