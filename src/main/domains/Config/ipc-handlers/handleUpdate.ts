import { AppDataSource } from '@main/database/AppDataSource'
import { Config } from '@main/database/models/common/Config'
import { mapConfigToDTO } from '@main/domains/Config/mappers'
import { DBHandler } from '@main/types'

import { ConfigDTO, ConfigInputDTO } from '@shared/domains/Config/types'
import { createLog } from '@shared/utils/createLog'

export const handleUpdate: DBHandler<ConfigDTO | null, ConfigInputDTO> = async function (payload) {
  const log = createLog({ ipcTag: 'config:update' })

  const repo = AppDataSource.getRepository(Config)
  const existing = await repo.findOne({ where: { id: 1 } })

  log.info(`Config payload`, payload)

  let instance: Config

  if (existing) {
    log.info(`Found existing config - start merge`, existing)
    instance = repo.merge(existing, { ...payload, id: existing.id })
  } else {
    log.warn(`Config not found - create new one and merge`, existing)
    instance = repo.create({ ...payload, id: 1 })
  }

  const saved = await repo.save(instance)
  log.success(`Saved`, saved)
  return mapConfigToDTO(saved)
}
