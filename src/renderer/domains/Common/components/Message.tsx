import { FC } from 'react'
import { Alert, AlertTitle, Box } from '@mui/material'

type MessageType = 'error' | 'warning' | 'info' | 'success'

type Props = {
  type: MessageType
  title?: string
  message: string
}

export const Message: FC<Props> = ({ type, title, message }) => {
  return (
    <Box my={2}>
      <Alert severity={type}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Box>
  )
}
