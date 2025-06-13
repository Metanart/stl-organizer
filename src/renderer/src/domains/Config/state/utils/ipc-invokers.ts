import { createIpcInvoker } from '@renderer/utils/createIpcInvoker'

import { ConfigDTO, ConfigInputDTO } from '@shared/domains/Config/types'

export const invokeConfigGet = createIpcInvoker<ConfigDTO | null>(
  window.api.config.get,
  'config:get'
)

export const invokeConfigUpdate = createIpcInvoker<ConfigDTO, ConfigInputDTO>(
  window.api.config.update,
  'config:update'
)
