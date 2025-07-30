import { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useI18nContext } from '@i18n/i18n-react.generated'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Grid,
  Switch,
  TextField
} from '@mui/material'
import { FolderInput } from '@renderer/domains/Common/components/FolderInput'

import { ConfigFormDTO, ConfigUpdateFormDTO } from '@shared/domains/Config/Config.dtos'
import { ConfigUpdateFormSchema } from '@shared/domains/Config/Config.schemes'

type Props = {
  configFormDto?: ConfigFormDTO
  isDisabled?: boolean
  onSave: (configUpdateFormDto: ConfigUpdateFormDTO) => void
}

const defaultValues = {
  outputFolder: '',
  tempFolder: '',
  maxThreads: 1,
  autoProcessOnScan: false,
  autoArchiveOnComplete: false,
  useMultithreading: false,
  debugMode: false
}

export const ConfigUpdateForm: FC<Props> = ({ configFormDto, isDisabled, onSave }) => {
  const { LL } = useI18nContext()

  const { control, reset, handleSubmit } = useForm<ConfigUpdateFormDTO>({
    resolver: zodResolver(ConfigUpdateFormSchema),
    defaultValues
  })

  useEffect(() => {
    if (configFormDto) {
      reset(configFormDto)
    }
  }, [configFormDto, reset])

  const onSubmit = (configUpdateFormDto: ConfigUpdateFormDTO): void => {
    onSave(configUpdateFormDto)
  }

  const fieldsLexemes = LL.config.updateForm.fields
  const actionsLexemes = LL.common.actions

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card variant="outlined">
        <CardContent sx={{ px: 2, py: 4 }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, lg: 5 }}>
              <Controller
                name="outputFolder"
                control={control}
                disabled={isDisabled}
                render={({ field, fieldState }) => (
                  <FolderInput
                    name={field.name}
                    value={field.value}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    label={fieldsLexemes.outputFolder.label()}
                    placeholder={fieldsLexemes.outputFolder.placeholder()}
                    onChange={(e) => field.onChange(e.target.value)}
                    onSelect={(newPath) => field.onChange(newPath)}
                    fullWidth={true}
                    isDisabled={isDisabled || field.disabled}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, lg: 5 }}>
              <Controller
                name="tempFolder"
                control={control}
                disabled={isDisabled}
                render={({ field, fieldState }) => (
                  <FolderInput
                    name={field.name}
                    value={field.value}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    label={fieldsLexemes.tempFolder.label()}
                    placeholder={fieldsLexemes.tempFolder.placeholder()}
                    onChange={(e) => field.onChange(e.target.value)}
                    onSelect={(newPath) => field.onChange(newPath)}
                    fullWidth={true}
                    isDisabled={isDisabled || field.disabled}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, lg: 2 }}>
              <Controller
                name="maxThreads"
                control={control}
                disabled={isDisabled}
                render={({ field, fieldState }) => (
                  <TextField
                    type="number"
                    name={field.name}
                    value={field.value}
                    disabled={isDisabled || field.disabled}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    label={fieldsLexemes.maxThreads.label()}
                    onChange={(e) =>
                      field.onChange(e.target.value === '' ? 1 : Number(e.target.value))
                    }
                    fullWidth={true}
                  />
                )}
              />
            </Grid>

            <Grid container spacing={0} size={{ xs: 12 }}>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <Controller
                  name="autoProcessOnScan"
                  control={control}
                  disabled={isDisabled}
                  render={({ field }) => (
                    <FormControlLabel
                      label={fieldsLexemes.autoProcessOnScan.label()}
                      control={
                        <Switch
                          disabled={isDisabled || field.disabled}
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <Controller
                  name="autoArchiveOnComplete"
                  control={control}
                  disabled={isDisabled}
                  render={({ field }) => (
                    <FormControlLabel
                      label={fieldsLexemes.autoArchiveOnComplete.label()}
                      control={
                        <Switch
                          disabled={isDisabled || field.disabled}
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <Controller
                  name="useMultithreading"
                  control={control}
                  disabled={isDisabled}
                  render={({ field }) => (
                    <FormControlLabel
                      label={fieldsLexemes.useMultithreading.label()}
                      control={
                        <Switch
                          disabled={isDisabled || field.disabled}
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <Controller
                  name="debugMode"
                  control={control}
                  disabled={isDisabled}
                  render={({ field }) => (
                    <FormControlLabel
                      label={fieldsLexemes.debugMode.label()}
                      control={
                        <Switch
                          disabled={isDisabled || field.disabled}
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ justifyContent: 'flex-end', px: 2, pt: 0, pb: 2 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ alignSelf: 'flex-start' }}
            disabled={isDisabled}
          >
            {actionsLexemes.save()}
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}
