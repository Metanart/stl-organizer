import React from 'react'
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material'

export const Config: React.FC = () => {
  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Config
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={3}>
        <TextField
          label="Output Folder"
          fullWidth
          variant="outlined"
          name="outputFolder"
          slotProps={{
            input: {
              readOnly: true
            }
          }}
        />

        <TextField
          label="Temp Folder"
          fullWidth
          variant="outlined"
          name="outputFolder"
          slotProps={{
            input: {
              readOnly: true
            }
          }}
        />

        <TextField
          label="Max Threads"
          type="number"
          name="maxThreads"
          fullWidth
          variant="outlined"
          slotProps={{
            input: {
              readOnly: true
            }
          }}
        />

        <FormControlLabel
          control={<Checkbox name="autoProcessOnScan" />}
          label="Auto Process on Scan"
        />

        <FormControlLabel
          control={<Checkbox name="autoArchiveOnComplete" />}
          label="Auto Archive on Complete"
        />

        <FormControlLabel
          control={<Checkbox name="useMultithreading" />}
          label="Use Multithreading"
        />

        <FormControlLabel control={<Checkbox name="debugMode" />} label="Debug Mode" />

        <TextField
          label="Last Updated"
          fullWidth
          name="updatedAt"
          variant="outlined"
          slotProps={{
            input: {
              readOnly: true
            }
          }}
        />
      </Stack>
    </Box>
  )
}
