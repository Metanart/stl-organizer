import { FC, JSX, PropsWithChildren } from 'react'
import { Box } from '@mui/material'

type Props = PropsWithChildren & {
  navigationWidth: number
}

export const AppContent: FC<Props> = (props): JSX.Element => {
  const { children, navigationWidth } = props

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: `calc(100% - ${navigationWidth}px)`,
        transition: 'width 0.3s'
      }}
    >
      {children}
    </Box>
  )
}
