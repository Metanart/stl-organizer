import { dialog } from 'electron'

export async function handleDialogSelectFolder(): Promise<string | null> {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })

  if (result.canceled || result.filePaths.length === 0) return null

  return result.filePaths[0]
}
