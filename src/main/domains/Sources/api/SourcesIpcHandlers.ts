import { createIpcHandler } from '@main/utils/createIpcHandler'
import { ipcMain } from 'electron'

import {
  SourceCreateDTO,
  SourceDTO,
  SourceInputDTO,
  SourceRemoveDTO
} from '@shared/domains/Sources/types/Source.types'

import { handleCreate } from './handleCreate'
import { handleGetAll } from './handleGetAll'
import { handleRemove } from './handleRemove'
import { handleUpdate } from './handleUpdate'

ipcMain.handle(
  'sources:getAll',
  createIpcHandler<SourceDTO[] | null>('sources:getAll', handleGetAll)
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
  createIpcHandler<SourceRemoveDTO | null, SourceRemoveDTO>('sources:remove', handleRemove)
)
