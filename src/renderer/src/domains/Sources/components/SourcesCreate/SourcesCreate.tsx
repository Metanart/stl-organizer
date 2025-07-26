import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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

import { SourceCreateFormDTO } from '@shared/domains/Sources/dtos/SourceDTO'
import { sourceCreateSchema } from '@shared/domains/Sources/schemes/SourceSchemes'

type Props = {
  onSave: (formState: SourceCreateFormDTO) => void
  onCancel?: () => void
}

const defaultValues = {
  name: '',
  path: '',
  isEnabled: true,
  comment: ''
}

export const SourcesCreate: FC<Props> = (props) => {
  const { onSave, onCancel } = props

  const { control, handleSubmit } = useForm<SourceCreateFormDTO>({
    resolver: zodResolver(sourceCreateSchema),
    defaultValues
  })

  const onSubmit = (data: SourceCreateFormDTO): void => {
    onSave(data)
  }

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
                    fullWidth
                    label="Name"
                    placeholder="Short source name"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
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
                    label="Path"
                    fullWidth
                    placeholder="/path/to/folder"
                    value={field.value}
                    name={field.name}
                    onChange={(e) => field.onChange(e.target.value)}
                    onSelect={(newPath) => field.onChange(newPath)}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
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
                    fullWidth
                    label="Comment"
                    multiline
                    rows={3}
                    placeholder="Optional description..."
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
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
                    control={
                      <Switch
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Enabled"
                  />
                )}
              />
            </Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ justifyContent: 'flex-end', px: 2, pt: 0, pb: 2 }}>
          {onCancel && (
            <Button onClick={onCancel} color="secondary">
              Cancel
            </Button>
          )}
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}
