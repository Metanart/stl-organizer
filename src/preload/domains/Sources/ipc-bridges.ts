import { createIpcBridge } from '@preload/utils/createIpcBridge'

import {
  SourceCreateDTO,
  SourceDTO,
  SourceInputDTO,
  SourceRemoveDTO
} from '@shared/domains/Sources/types/Source.types'

export const ipcBridgesSources = {
  getAll: createIpcBridge<SourceDTO[] | null>('sources:getAll'),
  update: createIpcBridge<SourceDTO, SourceInputDTO>('sources:update'),
  create: createIpcBridge<SourceDTO, SourceCreateDTO>('sources:create'),
  remove: createIpcBridge<SourceRemoveDTO | null, SourceRemoveDTO>('sources:remove')
} as const

export type IpcBridgesSources = typeof ipcBridgesSources
