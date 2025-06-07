import { AppDataSource } from '@main/AppDataSource'
import { Config } from '@main/models/common/Config'

import { IPC_ACTION, IPC_ENTITY } from '@shared/enums/ipc'
import { getIpcTag } from '@shared/utils/getIpcTag'

import { registerIpcHandler } from './utils/registerIpcHandler'

const baseTag = IPC_ENTITY.CONFIG

registerIpcHandler<Config | null>(getIpcTag(baseTag, IPC_ACTION.GET), async () => {
  const repo = AppDataSource.getRepository(Config)
  return await repo.findOne({})
})

registerIpcHandler<Config, Partial<Config>>(
  getIpcTag(baseTag, IPC_ACTION.UPDATE),
  async (_event, payload: Partial<Config>) => {
    const repo = AppDataSource.getRepository(Config)
    const existing = await repo.findOne({})
    const instance = existing ? repo.merge(existing, payload) : repo.create(payload)
    return await repo.save(instance)
  }
)
