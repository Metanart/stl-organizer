import { Children, FC, PropsWithChildren } from 'react'
import { Grid } from '@mui/material'

export const ModelsGallery: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid container spacing={2}>
      {Children.map(children, (child) => (
        <Grid key={'1'} sx={{ flexGrow: 1 }} size={{ xs: 6, sm: 4, md: 3, lg: 2, xl: 1 }}>
          {child}
        </Grid>
      ))}
    </Grid>
  )
}
