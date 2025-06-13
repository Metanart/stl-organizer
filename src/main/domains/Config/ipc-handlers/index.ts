import { createIpcHandler } from '@main/utils/createIpcHandler'
import { ipcMain } from 'electron'

import { ConfigDTO, ConfigInputDTO } from '@shared/domains/Config/types'

import { handleGetAll } from './handleGetAll'
import { handleUpdate } from './handleUpdate'

ipcMain.handle('config:get', createIpcHandler<ConfigDTO | null>('config:get', handleGetAll))

ipcMain.handle(
  'config:update',
  createIpcHandler<ConfigDTO | null, ConfigInputDTO>('config:update', handleUpdate)
)
