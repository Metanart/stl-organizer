import { FC, PropsWithChildren } from 'react'
import { Box, Divider, Typography } from '@mui/material'

type Props = { title: string } & PropsWithChildren

export const Page: FC<Props> = ({ title, children }) => {
  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {children}
    </Box>
  )
}
