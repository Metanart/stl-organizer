import { createIpcBridge } from '@preload/utils/createIpcBridge'

import { SourceDTO, SourceInputDTO, SourcesDTO } from '@shared/domains/Sources/types'

export const ipcBridgesSources = {
  getAll: createIpcBridge<SourcesDTO | null>('sources:getAll'),
  update: createIpcBridge<SourceDTO, SourceInputDTO>('sources:update'),
  create: createIpcBridge<SourceDTO, SourceInputDTO>('sources:create')
} as const

export type IpcBridgesSources = typeof ipcBridgesSources
