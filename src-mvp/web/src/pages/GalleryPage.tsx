import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

export type FileCategory = 'folder' | 'archive' | 'image' | 'file'

export interface FileNode {
  name: string
  type: string
  category: FileCategory
  size: number | null
  path: string
  children: FileNode[] | null
  windowsPath: string
}

function extractGalleryImagePath(folder: FileNode): string | null {
  const galleryFolder = folder.children?.find(
    (child) => child.category === 'folder' && child.name === 'gallery'
  ) as FileNode | undefined

  if (!galleryFolder || !galleryFolder.children?.length) return null

  const firstImage = galleryFolder.children.find((child) => child.category === 'image') as
    | FileNode
    | undefined

  return firstImage?.path || null
}

export const GalleryPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [folderTree, setFolderTree] = useState<FileNode | undefined>(undefined)

  const [openDialog, setOpenDialog] = useState(false)
  const [dialogImages, setDialogImages] = useState<string[]>([])
  const [dialogTitle, setDialogTitle] = useState('')

  const openGalleryDialog = (folder: FileNode) => {
    const gallery = folder.children?.find(
      (child) => child.category === 'folder' && child.name === 'gallery'
    )
    if (!gallery || !gallery.children) return

    const images = gallery.children
      .filter((img) => img.category === 'image')
      .map((img) => `/api/image?path=${encodeURIComponent(img.path)}`)

    setDialogImages(images)
    setDialogTitle(folder.name)
    setOpenDialog(true)
  }

  const handleGetModelsList = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/api/models')
      setFolderTree(response.data)
      console.log(response.data)
    } catch (err) {
      console.error('Transfer failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateGalleryJson = async () => {
    setLoading(true)

    try {
      const response = await axios.get('/api/generate-gallery-json')
      console.log(response.data)
    } catch (err) {
      console.error('Generation failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (path: string) => {
    try {
      await axios.delete('/api/model', {
        params: {
          path
        }
      })

      setFolderTree((prev) =>
        prev
          ? {
              ...prev,
              children: prev.children?.filter((child) => child.path !== path) ?? []
            }
          : undefined
      )
    } catch (err) {
      console.error('Deletion failed:', err)
    }
  }

  return (
    <Box padding={2}>
      <Stack direction="row" spacing={2} alignItems="center" mb={4}>
        <Button variant="contained" onClick={handleGetModelsList} disabled={loading} sx={{ mb: 2 }}>
          {loading ? <CircularProgress size={20} /> : 'Generate Gallery'}
        </Button>
        <Button
          variant="contained"
          onClick={handleGenerateGalleryJson}
          disabled={loading}
          sx={{ mb: 2 }}
        >
          {loading ? <CircularProgress size={20} /> : 'Generate Gallery JSON'}
        </Button>
      </Stack>

      {folderTree && (
        <Grid container spacing={2}>
          {folderTree.children?.map((modelFolder) => {
            const image = extractGalleryImagePath(modelFolder)
            return (
              <Grid
                key={modelFolder.name}
                sx={{ flexGrow: 1 }}
                size={{ xs: 6, sm: 4, md: 3, lg: 2, xl: 1 }}
              >
                <Card>
                  {image && (
                    <CardMedia
                      onClick={() => openGalleryDialog(modelFolder)}
                      sx={{ cursor: 'pointer' }}
                      component="img"
                      height="180"
                      image={`/api/image?path=${encodeURIComponent(image)}`}
                      alt={modelFolder.name}
                    />
                  )}
                  <CardContent>
                    <Typography variant="body1" noWrap={false}>
                      {modelFolder.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {' '}
                    <Button
                      size="small"
                      color="error"
                      variant="contained"
                      onClick={() => handleDelete(modelFolder.path)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialogTitle}
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialog(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            {dialogImages.map((src, index) => (
              <Box
                key={index}
                component="img"
                src={src}
                alt={`Preview ${index + 1}`}
                sx={{ width: '100%', borderRadius: 1 }}
              />
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  )
}
