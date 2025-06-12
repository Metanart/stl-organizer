import { createIpcHandler } from '@renderer/utils/createIpcHandler'

import { ConfigState } from '@shared/types/config'

export const fetchConfigGet = createIpcHandler<ConfigState>(window.api.config.get, 'config:get')

export const fetchConfigUpdate = createIpcHandler<ConfigState, ConfigState>(
  window.api.config.update,
  'config:update'
)
