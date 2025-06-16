import { FC, PropsWithChildren } from 'react'
import { Box } from '@mui/material'

export const PageContent: FC<PropsWithChildren> = ({ children }) => {
  return <Box p={2}>{children}</Box>
}
