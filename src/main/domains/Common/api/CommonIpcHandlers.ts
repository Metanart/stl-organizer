import { ipcMain } from 'electron'

import { COMMON_IPC_TAGS } from '@shared/domains/Common/CommonIpcTags'

import { DialogService } from '../services/DialogService'

const { DialogServiceSelectFolder } = COMMON_IPC_TAGS

ipcMain.handle(DialogServiceSelectFolder, DialogService.selectFolder)
