import { FC, JSX, PropsWithChildren } from 'react'
import { Box } from '@mui/material'

export const App: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  return (
    <Box p={0} sx={{ display: 'flex', backgroundColor: 'background.default', minHeight: '100vh' }}>
      {children}
    </Box>
  )
}
