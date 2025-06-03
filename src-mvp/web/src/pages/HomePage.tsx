import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography
} from '@mui/material'
import axios from 'axios'
import { useState } from 'react'

export type FileCategory = 'folder' | 'archive' | 'image' | 'file'

export interface FileNode {
  name: string
  type: string // extension without dot, lowercase
  category: FileCategory
  size: number | null // in megabytes, null for folders
  path: string // absolute path
  children: FileNode[] | null
}

type FolderResult = {
  folder: string
  archives: {
    name: string
    images: string[]
  }[]
  imagesMap: Record<string, { path: string; source: 'internal' | 'external' }[]>
  folderTree: FileNode
}

export const HomePage = () => {
  const [loading, setLoading] = useState(false)
  const [folderResult, setfolderResult] = useState<FolderResult | undefined>(undefined)

  const handleScan = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/api/scan-preview')
      const data = response.data

      console.log(data.folders[0])
      setfolderResult(data.folders[0] || [])
    } catch (err) {
      console.error('Scan failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Stack direction="row" spacing={2} alignItems="center" mb={4}>
        <Typography variant="h5">Archive Preview</Typography>
        <Button variant="contained" onClick={handleScan} disabled={loading}>
          {loading ? <CircularProgress size={20} /> : 'Scan for archives'}
        </Button>
      </Stack>

      {!folderResult && !loading && (
        <Typography variant="body1" color="textSecondary">
          No scan results yet.
        </Typography>
      )}

      {folderResult ? (
        <Stack spacing={3}>
          <Card key={folderResult.folder} variant="outlined">
            <CardHeader title={`📁 ${folderResult.folder}`} />
            <CardContent>
              {folderResult.archives.length === 0 ? (
                <Typography color="textSecondary">No archives found</Typography>
              ) : (
                <List dense>
                  {folderResult.archives.map((archive) => (
                    <ListItem key={archive.name} alignItems="flex-start">
                      <ListItemText
                        primary={`📦 ${archive.name}`}
                        secondary={
                          archive.images.length > 0
                            ? `🖼 ${archive.images.join(', ')}`
                            : 'No images matched'
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Stack>
      ) : null}
    </Box>
  )
}
