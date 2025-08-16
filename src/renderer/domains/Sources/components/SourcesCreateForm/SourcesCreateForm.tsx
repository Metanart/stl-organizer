import { FC } from 'react'
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

import { SourceCreateFormDTO } from '@shared/domains/Sources/Sources.dtos'
import { SourceCreateFormSchema } from '@shared/domains/Sources/Sources.schemes'

const DEFAULT_VALUES = {
  name: '',
  path: '',
  isEnabled: true,
  comment: ''
}

type Props = {
  onSave: (sourceCreateFormDto: SourceCreateFormDTO, isDirty: boolean) => void
  onCancel?: () => void
  isDisabled?: boolean
}

export const SourcesCreateForm: FC<Props> = ({ onSave, onCancel, isDisabled }) => {
  const { LL } = useI18nContext()

  const {
    control,
    handleSubmit,
    formState: { isDirty }
  } = useForm<SourceCreateFormDTO>({
    resolver: zodResolver(SourceCreateFormSchema),
    defaultValues: DEFAULT_VALUES
  })

  const onSubmit = (sourceCreateFormDto: SourceCreateFormDTO): void => {
    onSave(sourceCreateFormDto, isDirty)
  }

  const fieldsLexemes = LL.sources.createForm.fields
  const actionsLexemes = LL.app.actions

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card variant="outlined">
        <CardContent sx={{ px: 2, py: 4 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="name"
                control={control}
                disabled={isDisabled}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    disabled={isDisabled || field.disabled}
                    label={fieldsLexemes.name.label()}
                    placeholder={fieldsLexemes.name.placeholder()}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth={true}
                    autoFocus={true}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="path"
                control={control}
                disabled={isDisabled}
                render={({ field, fieldState }) => (
                  <FolderInput
                    {...field}
                    isDisabled={isDisabled || field.disabled}
                    label={fieldsLexemes.path.label()}
                    placeholder={fieldsLexemes.path.placeholder()}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    onChange={(e) => field.onChange(e.target.value)}
                    onSelect={(newPath) => field.onChange(newPath)}
                    fullWidth={true}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Controller
                name="comment"
                control={control}
                disabled={isDisabled}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    disabled={isDisabled || field.disabled}
                    label={fieldsLexemes.comment.label()}
                    placeholder={fieldsLexemes.comment.placeholder()}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    rows={3}
                    multiline={true}
                    fullWidth={true}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Controller
                name="isEnabled"
                control={control}
                disabled={isDisabled}
                render={({ field }) => (
                  <FormControlLabel
                    label={fieldsLexemes.isEnabled.label()}
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
        </CardContent>

        <CardActions sx={{ justifyContent: 'flex-end', px: 2, pt: 0, pb: 2 }}>
          {onCancel && (
            <Button onClick={onCancel} color="secondary">
              {actionsLexemes.cancel()}
            </Button>
          )}
          <Button type="submit" variant="contained" color="primary" disabled={isDisabled}>
            {actionsLexemes.save()}
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}
