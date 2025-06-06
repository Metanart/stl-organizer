import { FC } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography
} from '@mui/material'

import { SourceFoldersItem } from './SourceFolders.types'

type Props = {
  folders: SourceFoldersItem[]
}

export const SourceFolders: FC<Props> = ({ folders }) => {
  return (
    <Grid container direction="column" spacing={4}>
      {folders.map(({ id, isEnabled, comment, lastScannedAt, path, sourceType }) => (
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
                  <FormControl fullWidth>
                    <InputLabel id={`source-type-label-${id}`}>Source Type</InputLabel>
                    <Select
                      labelId={`source-type-label-${id}`}
                      defaultValue={sourceType}
                      label="Source Type"
                    >
                      <MenuItem value="manual">Manual</MenuItem>
                      <MenuItem value="torrent">Torrent</MenuItem>
                      <MenuItem value="download">Download</MenuItem>
                    </Select>
                  </FormControl>
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

                <Grid size={12}>
                  <Typography variant="body2" color="text.secondary">
                    Last scanned:{' '}
                    {lastScannedAt ? new Date(lastScannedAt).toLocaleString() : 'Never'}
                  </Typography>
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

      <Grid>
        <Button variant="contained" color="secondary">
          Add Folder
        </Button>
      </Grid>
    </Grid>
  )
}
