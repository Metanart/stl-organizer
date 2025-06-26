import { createIpcInvoker, createIpcInvokerWithPayload } from '@preload/utils/createIpcInvoker'

import { ConfigDTO, ConfigUpdateFormDTO } from '@shared/domains/Config/dto/ConfigDTO'

export const configIpcInvokers = {
  get: createIpcInvoker<ConfigDTO | null>('ConfigIpc.get'),
  update: createIpcInvokerWithPayload<ConfigDTO | null, ConfigUpdateFormDTO>('ConfigIpc.update')
} as const

export type ConfigIpcInvokers = typeof configIpcInvokers
