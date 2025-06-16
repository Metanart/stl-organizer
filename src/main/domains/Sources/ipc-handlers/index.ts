import { createIpcHandler } from '@main/utils/createIpcHandler'
import { ipcMain } from 'electron'

import {
  SourceCreateDTO,
  SourceDTO,
  SourceInputDTO,
  SourcesDTO
} from '@shared/domains/Sources/types'

import { handleCreate } from './handleCreate'
import { handleGetAll } from './handleGetAll'
import { handleRemove } from './handleRemove'
import { handleUpdate } from './handleUpdate'

ipcMain.handle(
  'sources:getAll',
  createIpcHandler<SourcesDTO | null>('sources:getAll', handleGetAll)
)

ipcMain.handle(
  'sources:update',
  createIpcHandler<SourceDTO | null, SourceInputDTO>('sources:update', handleUpdate)
)

ipcMain.handle(
  'sources:create',
  createIpcHandler<SourceDTO | null, SourceCreateDTO>('sources:create', handleCreate)
)

ipcMain.handle(
  'sources:remove',
  createIpcHandler<{ id: number } | null, { id: number }>('sources:remove', handleRemove)
)
