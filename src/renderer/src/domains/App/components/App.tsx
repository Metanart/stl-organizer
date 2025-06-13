import { FC, JSX, PropsWithChildren } from 'react'
import { Box } from '@mui/material'

export const App: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return <Box sx={{ display: 'flex' }}>{children}</Box>
}
