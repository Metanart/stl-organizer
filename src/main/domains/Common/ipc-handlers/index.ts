import { ipcMain } from 'electron'

import { handleDialogSelectFolder } from './handleDialogSelectFolder'

ipcMain.handle('dialog:select-folder', handleDialogSelectFolder)
