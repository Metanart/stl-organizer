import { FC, PropsWithChildren } from 'react'
import { Grid } from '@mui/material'

export const SourcesList: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid container direction="column" spacing={4}>
      {children}
    </Grid>
  )
}
