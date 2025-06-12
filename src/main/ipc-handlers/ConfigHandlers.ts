import { AppDataSource } from '@main/database/AppDataSource'
import { Config } from '@main/database/models/common/Config'

import { IPC_ACTION, IPC_ENTITY } from '@shared/enums/ipc'
import { getIpcTag } from '@shared/utils/getIpcTag'
import { logger } from '@shared/utils/logger'

import { registerIpcHandler } from './utils/registerIpcHandler'

const baseTag = IPC_ENTITY.CONFIG
const log = logger.withTag(baseTag)

registerIpcHandler<Config | null>(getIpcTag(baseTag, IPC_ACTION.GET), async () => {
  log.info('IPC handle config get')

  const repo = AppDataSource.getRepository(Config)
  return await repo.findOne({ where: { id: 1 } })
})

registerIpcHandler<Config, Partial<Config>>(
  getIpcTag(baseTag, IPC_ACTION.UPDATE),
  async (_event, payload: Partial<Config>) => {
    log.info('IPC handle config update')

    const repo = AppDataSource.getRepository(Config)
    const existing = await repo.findOne({ where: { id: 1 } })
    const instance = existing ? repo.merge(existing, payload) : repo.create(payload)
    return await repo.save(instance)
  }
)
