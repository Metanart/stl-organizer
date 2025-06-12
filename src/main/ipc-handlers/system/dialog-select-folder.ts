import { dialog, ipcMain } from 'electron'

ipcMain.handle('dialog:select-folder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })

  if (result.canceled || result.filePaths.length === 0) return null

  return result.filePaths[0]
})
