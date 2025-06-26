import { ipcMain } from 'electron'

import { DialogService } from '../services/DialogService'

ipcMain.handle('dialog:select-folder', DialogService.selectFolder)
