import { FC, ReactNode } from 'react'
import { Box, Divider, Stack, Typography } from '@mui/material'

export type PageHeaderActions = Record<string, ReactNode>

type Props = {
  title: string
  controls?: ReactNode
}

export const PageHeader: FC<Props> = (props) => {
  const { title, controls } = props

  return (
    <Box
      component={'header'}
      sx={{
        backgroundColor: 'background.paper',
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1201
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ pl: 4, minHeight: 56 }}
      >
        <Typography variant="h5" fontWeight={600} component="h1" py={2}>
          {title}
        </Typography>

        {controls}
      </Stack>
      <Divider />
    </Box>
  )
}
