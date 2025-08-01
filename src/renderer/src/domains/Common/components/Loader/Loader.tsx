import { FC, Fragment } from 'react'
import { CircularProgress, Typography } from '@mui/material'

export type LoaderProps = {
  message?: string
  size?: number
}

export const Loader: FC<LoaderProps> = ({ message = 'Loading...', size = 40 }) => {
  return (
    <Fragment>
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" color="text.secondary" mt={2}>
          {message}
        </Typography>
      )}
    </Fragment>
  )
}
