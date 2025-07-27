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
import { SourcesCreateFormSchema } from '@shared/domains/Sources/Sources.schemes'

const defaultValues = {
  name: '',
  path: '',
  isEnabled: true,
  comment: ''
}

type Props = {
  onSave: (sourceCreateFormDto: SourceCreateFormDTO) => void
  onCancel?: () => void
}

export const SourcesCreateForm: FC<Props> = ({ onSave, onCancel }) => {
  const { LL } = useI18nContext()

  const { control, handleSubmit } = useForm<SourceCreateFormDTO>({
    resolver: zodResolver(SourcesCreateFormSchema),
    defaultValues
  })

  const onSubmit = (sourceCreateFormDto: SourceCreateFormDTO): void => {
    onSave(sourceCreateFormDto)
  }

  const fieldsLexemes = LL.sources.createForm.fields
  const actionsLexemes = LL.common.actions

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card variant="outlined">
        <CardContent sx={{ px: 2, py: 4 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label={fieldsLexemes.name.label()}
                    placeholder={fieldsLexemes.name.placeholder()}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                    autoFocus
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="path"
                control={control}
                render={({ field, fieldState }) => (
                  <FolderInput
                    label={fieldsLexemes.path.label()}
                    placeholder={fieldsLexemes.path.placeholder()}
                    name={field.name}
                    value={field.value}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    onChange={(e) => field.onChange(e.target.value)}
                    onSelect={(newPath) => field.onChange(newPath)}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Controller
                name="comment"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label={fieldsLexemes.comment.label()}
                    placeholder={fieldsLexemes.comment.placeholder()}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    rows={3}
                    multiline
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Controller
                name="isEnabled"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    label={fieldsLexemes.isEnabled.label()}
                    control={
                      <Switch
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
          <Button type="submit" variant="contained" color="primary">
            {actionsLexemes.save()}
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}
