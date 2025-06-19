import { FC, PropsWithChildren } from 'react'
import { Box } from '@mui/material'

export const Page: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box p={0} sx={{ position: 'relative' }}>
      {children}
    </Box>
  )
}
