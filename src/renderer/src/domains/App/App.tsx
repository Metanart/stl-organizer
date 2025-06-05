import { FC, JSX, PropsWithChildren } from 'react'
import { Box, CssBaseline } from '@mui/material'

export const App: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {children}
    </Box>
  )
}
