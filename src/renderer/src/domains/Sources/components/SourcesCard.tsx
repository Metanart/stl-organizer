import { ChangeEvent, FC, FormEvent, useState } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import { FolderInput } from '@renderer/domains/Common/components/FolderInput'

import { Source } from '../types/Source.types'
import { SourceModel } from '../types/SourceModel.types'

type Props = {
  id: string
  name: string
  path: string
  isEnabled: boolean
  comment?: string | null
  models: SourceModel[]
  onRemove?: (sourceId: number) => void
  onSave: (source: Source) => void
}

export const SourcesCard: FC<Props> = (props) => {
  const { id, name, path = '', isEnabled, comment = '', models, onSave, onRemove } = props

  const [formState, setFormState] = useState<Source>({
    id,
    path,
    name,
    isEnabled,
    comment,
    models
  })

  function updateFormState(name: string, value: string, type?: string, checked?: boolean): void {
    setFormState((prevFormState) => {
      const updatedFormState = {
        ...prevFormState,
        [name]: type === 'checkbox' ? checked : value
      }

      return updatedFormState
    })
  }

  const handleSave = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    onSave(formState)
  }

  const handleRemove = (): void => onRemove?.(id)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = event.target

    updateFormState(name, value, type, checked)
  }

  const handleSelectFolder = (name: string, newPath: string): void => {
    updateFormState(name, newPath)
  }

  return (
    <form key={id} onSubmit={handleSave}>
      <Grid>
        <Card variant="outlined">
          <CardContent sx={{ px: 2, py: 4 }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <FolderInput
                  name={'path'}
                  fullWidth
                  label="Path"
                  value={formState.path || ''}
                  placeholder="/path/to/folder"
                  onSelect={handleSelectFolder}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid size={12}>
                <FormControlLabel
                  control={
                    <Switch
                      name="isEnabled"
                      checked={formState.isEnabled}
                      onChange={handleInputChange}
                    />
                  }
                  label="Enabled"
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  name="comment"
                  fullWidth
                  label="Comment"
                  multiline
                  rows={3}
                  defaultValue={formState.comment || ''}
                  onChange={handleInputChange}
                  placeholder="Optional description..."
                />
              </Grid>
              <Grid size={12}>
                {models.map((model) => {
                  return (
                    <Typography key={model.id} variant="body2" color="text.secondary" mt={2}>
                      {model.name}
                    </Typography>
                  )
                })}
              </Grid>
            </Grid>
          </CardContent>

          <CardActions sx={{ justifyContent: 'flex-end', px: 2, pt: 0, pb: 2 }}>
            {onRemove ? (
              <Button onClick={handleRemove} variant="outlined" color="error">
                Remove
              </Button>
            ) : null}
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </form>
  )
}
