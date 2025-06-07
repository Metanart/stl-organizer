import { createApiHandler } from '@renderer/utils/createApiHandler'

import { IPC_ENTITY } from '@shared/enums/ipc'

import { ConfigState } from '../Config.types'

const baseTag = IPC_ENTITY.CONFIG

export const invokeConfigGet = createApiHandler<ConfigState>(window.api.config.get, baseTag)

export const invokeConfigUpdate = createApiHandler<Partial<ConfigState>, Partial<ConfigState>>(
  window.api.config.update,
  IPC_ENTITY.CONFIG
)
