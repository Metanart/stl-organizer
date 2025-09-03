import { createIpcInvoker, createIpcInvokerWithPayload } from '@preload/utils/ipc/createIpcInvoker'

import { ConfigDTO, ConfigUpdateFormDTO } from '@shared/domains/Config/Config.dtos'

export const configIpcInvokers = {
  get: createIpcInvoker<ConfigDTO | null>('ConfigIpc.get'),
  update: createIpcInvokerWithPayload<ConfigDTO | null, ConfigUpdateFormDTO>('ConfigIpc.update')
} as const

export type ConfigIpcInvokers = typeof configIpcInvokers
