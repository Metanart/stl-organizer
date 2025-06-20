import { ChangeEvent, FC, useState } from 'react'
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

import { SourceCreate } from '../types/Source.types'

type Props = {
  onSave: (formState: SourceCreate) => void
}

export const SourcesCreate: FC<Props> = (props) => {
  const { onSave } = props

  const [formState, setFormState] = useState<SourceCreate>({
    name: '',
    path: '',
    isEnabled: true,
    comment: ''
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

  const handleSave = (): void => {
    onSave(formState)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = event.target

    updateFormState(name, value, type, checked)
  }

  const handleSelectFolder = (name: string, newPath: string): void => {
    updateFormState(name, newPath)
  }

  return (
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
                name="isEnabled"
                control={<Switch defaultChecked={formState.isEnabled} />}
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
          </Grid>
        </CardContent>

        <CardActions sx={{ justifyContent: 'flex-end', px: 2, pt: 0, pb: 2 }}>
          <Button onClick={handleSave} type="submit" variant="contained" color="primary">
            Save
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
