import { AppDataSource } from '@main/database/AppDataSource'
import { Config } from '@main/database/models/common/Config'

import { createLog } from '@shared/utils/createLog'

import { registerIpcHandler } from './utils/registerIpcHandler'

registerIpcHandler<Config | null>('config:get', async () => {
  const repo = AppDataSource.getRepository(Config)
  return await repo.findOne({ where: { id: 1 } })
})

registerIpcHandler<Config, Config>('config:update', async (_event, payload: Config) => {
  const log = createLog({ ipcTag: 'config:update' })

  const repo = AppDataSource.getRepository(Config)
  const existing = await repo.findOne({ where: { id: 1 } })

  log.info(`Config payload`, payload)
  log.info(`Found existing`, existing)

  let instance: Config

  if (existing) {
    instance = repo.merge(existing, { ...payload, id: existing.id })
  } else {
    instance = repo.create({ ...payload, id: 1 }) // важно!
  }

  const saved = await repo.save(instance)
  log.info(`Saved`, saved)
  return saved
})
