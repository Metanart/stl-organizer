import { FC } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

type Props = {
  message?: string
  size?: number
}

export const Loader: FC<Props> = ({ message = 'Loading...', size = 40 }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="200px"
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" color="text.secondary" mt={2}>
          {message}
        </Typography>
      )}
    </Box>
  )
}
