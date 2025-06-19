import { FC, ReactNode } from 'react'
import { Box, CardActions, Divider, Stack, Typography } from '@mui/material'

export type PageHeaderActions = Record<string, ReactNode>

type Props = {
  title: string
  actions?: PageHeaderActions
}

export const PageHeader: FC<Props> = (props) => {
  const { title, actions } = props

  const processedActions = Object.entries(actions || {}).map(([key, value]) => (
    <Box key={key}>{value}</Box>
  ))

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

        {actions && (
          <CardActions sx={{ justifyContent: 'flex-end' }}>{processedActions}</CardActions>
        )}
      </Stack>
      <Divider />
    </Box>
  )
}
