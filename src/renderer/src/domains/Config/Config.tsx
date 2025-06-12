import { ChangeEvent, FC, FormEvent, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material'

import { ConfigState } from '@shared/types/config'

type Props = {
  config: ConfigState
  onSubmit: (updated: ConfigState) => void
}

export const Config: FC<Props> = ({ config, onSubmit }) => {
  const [formState, setFormState] = useState<ConfigState>(config)

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = event.target
    setFormState((prevFormState) => {
      const updatedFormState = {
        ...prevFormState,
        [name]: type === 'checkbox' ? checked : value
      }

      console.log('Updated form state', updatedFormState)

      return updatedFormState
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    onSubmit(formState)
  }

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Config
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Output Folder"
            fullWidth
            variant="outlined"
            name="outputFolder"
            value={formState.outputFolder}
            onChange={handleChange}
          />

          <TextField
            label="Temp Folder"
            fullWidth
            variant="outlined"
            name="tempFolder"
            value={formState.tempFolder}
            onChange={handleChange}
          />

          <TextField
            label="Max Threads"
            type="number"
            name="maxThreads"
            fullWidth
            variant="outlined"
            value={formState.maxThreads}
            onChange={handleChange}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="autoProcessOnScan"
                checked={formState.autoProcessOnScan}
                onChange={handleChange}
              />
            }
            label="Auto Process on Scan"
          />

          <FormControlLabel
            control={
              <Checkbox
                name="autoArchiveOnComplete"
                checked={formState.autoArchiveOnComplete}
                onChange={handleChange}
              />
            }
            label="Auto Archive on Complete"
          />

          <FormControlLabel
            control={
              <Checkbox
                name="useMultithreading"
                checked={formState.useMultithreading}
                onChange={handleChange}
              />
            }
            label="Use Multithreading"
          />

          <FormControlLabel
            control={
              <Checkbox name="debugMode" checked={formState.debugMode} onChange={handleChange} />
            }
            label="Debug Mode"
          />

          <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start' }}>
            Save Config
          </Button>
        </Stack>
      </form>
    </Box>
  )
}
