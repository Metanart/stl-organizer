import { FC } from 'react'
import { Box } from '@mui/material'

import { Loader, LoaderProps } from '../../Loader/Loader'

export type PageLoaderProps = {
  height?: number
} & LoaderProps

export const PageLoader: FC<PageLoaderProps> = (props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight={props.height || 200}
      minWidth="100%"
    >
      <Loader {...props} />
    </Box>
  )
}
