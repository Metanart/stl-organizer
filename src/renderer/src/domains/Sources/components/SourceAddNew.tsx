import { FC, useState } from 'react'
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

type Props = { onSubmit: (SourcesItem) => void }

export const SourcesAddNew: FC<Props> = ({ onSubmit }) => {
  const [path, setPath] = useState('')
  const [isEnabled, setIsEnabled] = useState(true)
  const [comment, setComment] = useState('')

  const handleSubmit = (): void => {
    onSubmit({ path, isEnabled, comment })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <Card variant="outlined">
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Path"
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                  placeholder="/path/to/folder"
                />
              </Grid>

              <Grid size={12}>
                <FormControlLabel
                  control={
                    <Switch checked={isEnabled} onChange={(e) => setIsEnabled(e.target.checked)} />
                  }
                  label="Enabled"
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Comment"
                  multiline
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Optional description..."
                />
              </Grid>
            </Grid>
          </CardContent>

          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" color="primary" disabled={!path.trim()}>
              Save
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </form>
  )
}
