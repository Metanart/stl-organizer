import { createIpcHandler } from '@main/utils/createIpcHandler'
import { ipcMain } from 'electron'

import { ConfigDTO, ConfigInputDTO } from '@shared/domains/Config/types'

import { handleGet } from './handleGet'
import { handleUpdate } from './handleUpdate'

ipcMain.handle('config:get', createIpcHandler<ConfigDTO | null>('config:get', handleGet))

ipcMain.handle(
  'config:update',
  createIpcHandler<ConfigDTO | null, ConfigInputDTO>('config:update', handleUpdate)
)
