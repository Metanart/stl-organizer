import { FC } from 'react'
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

import { SourcesItem } from '../state/types'

type Props = {
  sources: SourcesItem[]
  onToggleAddNew: () => void
}

export const SourcesList: FC<Props> = ({ sources, onToggleAddNew }) => {
  return (
    <Grid container direction="column" spacing={4}>
      {sources.map(({ id, isEnabled, comment, path }) => (
        <Grid key={id}>
          <Card variant="outlined">
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Path"
                    defaultValue={path}
                    placeholder="/path/to/folder"
                  />
                </Grid>

                <Grid size={12}>
                  <FormControlLabel
                    control={<Switch defaultChecked={isEnabled} />}
                    label="Enabled"
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Comment"
                    multiline
                    rows={3}
                    defaultValue={comment || ''}
                    placeholder="Optional description..."
                  />
                </Grid>
              </Grid>
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button variant="outlined" color="error">
                Delete
              </Button>
              <Button variant="contained" color="primary">
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button type="button" onClick={onToggleAddNew} variant="contained" color="primary">
          Add new
        </Button>
      </CardActions>
    </Grid>
  )
}
