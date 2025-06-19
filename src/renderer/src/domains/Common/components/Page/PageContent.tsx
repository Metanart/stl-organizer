import { FC, PropsWithChildren } from 'react'
import { Box } from '@mui/material'

type Props = {
  p?: number
} & PropsWithChildren

export const PageContent: FC<Props> = ({ p = 4, children }) => {
  return <Box p={p}>{children}</Box>
}
