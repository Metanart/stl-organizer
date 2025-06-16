import { FC, PropsWithChildren } from 'react'
import { Box } from '@mui/material'

import { PageContent } from './PageContent'
import { PageHeader, PageHeaderActions } from './PageHeader'

type Props = { title: string; actions?: PageHeaderActions } & PropsWithChildren

export const Page: FC<Props> = ({ title, actions, children }) => {
  return (
    <Box p={0} sx={{ position: 'relative' }}>
      <PageHeader title={title} actions={actions} />
      <PageContent>{children}</PageContent>
    </Box>
  )
}
