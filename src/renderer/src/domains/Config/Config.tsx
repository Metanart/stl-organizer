import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { Button, Checkbox, FormControlLabel, Stack, TextField } from '@mui/material'

import { ConfigState } from '@shared/types/config'

import { FolderInput } from '../Common/ui/FolderInput'

type Props = {
  config: ConfigState
  onSubmit: (updated: ConfigState) => void
}

export const Config: FC<Props> = ({ config, onSubmit }) => {
  const [formState, setFormState] = useState<ConfigState>(config)

  function updateFormState(name: string, value: string, type?: string, checked?: boolean): void {
    setFormState((prevFormState) => {
      const updatedFormState = {
        ...prevFormState,
        [name]: type === 'checkbox' ? checked : value
      }

      console.log('Updated form state', updatedFormState)

      return updatedFormState
    })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = event.target

    updateFormState(name, value, type, checked)
  }

  const handleSelectFolder = (name: string, newPath: string): void => {
    updateFormState(name, newPath)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    onSubmit(formState)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <FolderInput
          label="Output folder"
          name="outputFolder"
          value={formState.outputFolder}
          onSelect={handleSelectFolder}
          onChange={handleChange}
        />

        <FolderInput
          label="Temp Folder"
          name="tempFolder"
          value={formState.tempFolder}
          onSelect={handleSelectFolder}
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
  )
}
