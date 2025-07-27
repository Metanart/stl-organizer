import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react'
import { useI18nContext } from '@i18n/i18n-react.generated'
import { Button, Checkbox, FormControlLabel, Stack, TextField } from '@mui/material'

import { ConfigFormDTO, ConfigUpdateFormDTO } from '@shared/domains/Config/dtos/ConfigDTO'

import { FolderInput } from '../../../Common/components/FolderInput'

type Props = {
  config: ConfigFormDTO
  onSubmit: (updated: ConfigUpdateFormDTO) => void
}

export const Config: FC<Props> = ({ config, onSubmit }) => {
  const [formState, setFormState] = useState<ConfigFormDTO>(config)
  const initialFormState = useRef<ConfigFormDTO>(config)

  const { LL } = useI18nContext()
  const fieldsLexemes = LL.config.form.fields

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
          label={fieldsLexemes.outputFolder.label()}
          name="outputFolder"
          value={formState.outputFolder}
          isUpdated={formState.outputFolder !== initialFormState.current.outputFolder}
          onSelect={handleSelectFolder}
          onChange={handleInputChange}
        />

        <FolderInput
          label={fieldsLexemes.tempFolder.label()}
          name="tempFolder"
          value={formState.tempFolder}
          onSelect={handleSelectFolder}
          onChange={handleInputChange}
        />

        <TextField
          label={fieldsLexemes.maxThreads.label()}
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
          label={fieldsLexemes.autoProcessOnScan.label()}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="autoArchiveOnComplete"
              checked={formState.autoArchiveOnComplete}
              onChange={handleInputChange}
            />
          }
          label={fieldsLexemes.autoArchiveOnComplete.label()}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="useMultithreading"
              checked={formState.useMultithreading}
              onChange={handleInputChange}
            />
          }
          label={fieldsLexemes.useMultithreading.label()}
        />

        <FormControlLabel
          control={
            <Checkbox name="debugMode" checked={formState.debugMode} onChange={handleInputChange} />
          }
          label={fieldsLexemes.debugMode.label()}
        />

        <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start' }}>
          {LL.common.actions.save()}
        </Button>
      </Stack>
    </form>
  )
}
