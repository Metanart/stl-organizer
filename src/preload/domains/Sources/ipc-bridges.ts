import { createIpcBridge } from '@preload/utils/createIpcBridge'

import {
  SourceCreateDTO,
  SourceDTO,
  SourceInputDTO,
  SourcesDTO
} from '@shared/domains/Sources/types'

export const ipcBridgesSources = {
  getAll: createIpcBridge<SourcesDTO | null>('sources:getAll'),
  update: createIpcBridge<SourceDTO, SourceInputDTO>('sources:update'),
  create: createIpcBridge<SourceDTO, SourceCreateDTO>('sources:create'),
  remove: createIpcBridge<{ id: number } | null, { id: number }>('sources:remove')
} as const

export type IpcBridgesSources = typeof ipcBridgesSources
