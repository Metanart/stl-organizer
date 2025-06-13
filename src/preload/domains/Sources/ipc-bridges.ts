import { createIpcBridge } from '@preload/utils/createIpcBridge'

import { SourceInputDTO, SourcesDTO } from '@shared/domains/Sources/types'

export const ipcBridgesSources = {
  getAll: createIpcBridge<SourcesDTO | null>('sources:getAll'),
  update: createIpcBridge<SourcesDTO, SourceInputDTO>('sources:update'),
  create: createIpcBridge<SourcesDTO, SourceInputDTO>('sources:create')
} as const

export type IpcBridgesSources = typeof ipcBridgesSources
