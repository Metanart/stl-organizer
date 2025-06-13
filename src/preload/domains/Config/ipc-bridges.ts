import { createIpcBridge } from '@preload/utils/createIpcBridge'

import { ConfigDTO, ConfigInputDTO } from '@shared/domains/Config/types'

export const ipcBridgesConfig = {
  get: createIpcBridge<ConfigDTO | null>('config:get'),
  update: createIpcBridge<ConfigDTO, ConfigInputDTO>('config:update')
} as const

export type IpcBridgesConfig = typeof ipcBridgesConfig
