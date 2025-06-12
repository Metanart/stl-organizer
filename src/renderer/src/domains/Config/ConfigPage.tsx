import { FC } from 'react'
import { Box, Divider, Typography } from '@mui/material'

import { ConfigContainer } from './ConfigContainer'

export const ConfigPage: FC = () => {
  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Config
      </Typography>

      <Divider sx={{ mb: 3 }} />
      <ConfigContainer />
    </Box>
  )
}
