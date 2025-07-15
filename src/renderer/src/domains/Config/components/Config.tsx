import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react'
import { Button, Checkbox, FormControlLabel, Stack, TextField } from '@mui/material'

import { ConfigFormDTO, ConfigUpdateFormDTO } from '@shared/domains/Config/dtos/ConfigDTO'

import { FolderInput } from '../../Common/components/FolderInput'

type Props = {
  config: ConfigFormDTO
  onSubmit: (updated: ConfigUpdateFormDTO) => void
}

export const Config: FC<Props> = ({ config, onSubmit }) => {
  const [formState, setFormState] = useState<ConfigFormDTO>(config)
  const initialFormState = useRef<ConfigFormDTO>(config)

  useEffect(() => {
    setFormState(config)
    initialFormState.current = config
  }, [config])

  function updateFormState(name: string, value: string, type?: string, checked?: boolean): void {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
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
          isUpdated={formState.outputFolder !== initialFormState.current.outputFolder}
          onSelect={handleSelectFolder}
          onChange={handleInputChange}
        />

        <FolderInput
          label="Temp Folder"
          name="tempFolder"
          value={formState.tempFolder}
          onSelect={handleSelectFolder}
          onChange={handleInputChange}
        />

        <TextField
          label="Max Threads"
          type="number"
          name="maxThreads"
          fullWidth
          variant="outlined"
          value={formState.maxThreads}
          onChange={handleInputChange}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="autoProcessOnScan"
              checked={formState.autoProcessOnScan}
              onChange={handleInputChange}
            />
          }
          label="Auto Process on Scan"
        />

        <FormControlLabel
          control={
            <Checkbox
              name="autoArchiveOnComplete"
              checked={formState.autoArchiveOnComplete}
              onChange={handleInputChange}
            />
          }
          label="Auto Archive on Complete"
        />

        <FormControlLabel
          control={
            <Checkbox
              name="useMultithreading"
              checked={formState.useMultithreading}
              onChange={handleInputChange}
            />
          }
          label="Use Multithreading"
        />

        <FormControlLabel
          control={
            <Checkbox name="debugMode" checked={formState.debugMode} onChange={handleInputChange} />
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
