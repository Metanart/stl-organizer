import { FC, forwardRef, JSX } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import { Alert } from '@mui/material'

type Props = {
  message: string
  severity: 'success' | 'error' | 'warning' | 'info'
}

export const Notification: FC<Props> = forwardRef<HTMLDivElement, Props>(
  ({ message, severity }, ref) => {
    const renderIcon = (): JSX.Element => {
      switch (severity) {
        case 'success':
          return <CheckCircleOutlineIcon />
        case 'error':
          return <ErrorOutlineIcon />
        case 'warning':
          return <WarningAmberOutlinedIcon />
        case 'info':
          return <InfoOutlinedIcon />
      }
    }

    return (
      <Alert
        ref={ref}
        severity={severity}
        variant="filled"
        sx={{
          padding: '6px 12px 4px',
          fontSize: '.8em',
          color: 'white'
        }}
        data-testid={`notification-${severity}`}
        icon={renderIcon()}
      >
        {message}
      </Alert>
    )
  }
)

Notification.displayName = 'Notification'
