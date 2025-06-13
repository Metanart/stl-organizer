import { createIpcInvoker } from '@renderer/utils/createIpcInvoker'

import { ConfigDTO } from '@shared/domains/Config/types'

import { ConfigState } from '../../types'

export const invokeConfigGet = createIpcInvoker<ConfigDTO | null>(
  window.api.config.get,
  'config:get'
)

export const invokeConfigUpdate = createIpcInvoker<ConfigDTO, ConfigState>(
  window.api.config.update,
  'config:update'
)
