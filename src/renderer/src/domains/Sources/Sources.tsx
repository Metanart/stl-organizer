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

interface InputDirItem {
  id: number
  path: string
  isEnabled: boolean
  lastScannedAt?: string
  comment?: string
  sourceType: 'torrent' | 'manual' | 'download'
}

type Props = {
  inputDirs: InputDirItem[]
}

export const Sources: FC<Props> = ({ inputDirs }) => {
  return (
    <Grid container direction="column" spacing={4}>
      {inputDirs.map((dir) => (
        <Grid key={dir.id}>
          <Card variant="outlined">
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Path"
                    defaultValue={dir.path}
                    placeholder="/path/to/folder"
                  />
                </Grid>

                <Grid size={12}>
                  <FormControlLabel
                    control={<Switch defaultChecked={dir.isEnabled} />}
                    label="Enabled"
                  />
                </Grid>

                <Grid size={12}>
                  <FormControl fullWidth>
                    <InputLabel id={`source-type-label-${dir.id}`}>Source Type</InputLabel>
                    <Select
                      labelId={`source-type-label-${dir.id}`}
                      defaultValue={dir.sourceType}
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
                    defaultValue={dir.comment || ''}
                    placeholder="Optional description..."
                  />
                </Grid>

                <Grid size={12}>
                  <Typography variant="body2" color="text.secondary">
                    Last scanned:{' '}
                    {dir.lastScannedAt ? new Date(dir.lastScannedAt).toLocaleString() : 'Never'}
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
