import { AppDataSource } from '@main/database/AppDataSource'
import { Config } from '@main/domains/Config/entities/Config'
import { DBHandler } from '@main/types'

import { ConfigDTO, ConfigInputDTO } from '@shared/domains/Config/types'
import { createLog } from '@shared/utils/createLog'

import { ConfigMapper } from '../mappers/ConfigMapper'

export const handleUpdate: DBHandler<ConfigDTO | null, ConfigInputDTO> = async function (payload) {
  const log = createLog({ ipcTag: 'config:update' })

  const repo = AppDataSource.getRepository(Config)

  const provided = ConfigMapper.fromInputDTO(payload)
  const existing = await repo.findOne({ where: { id: provided.id } })

  log.info(`Config payload`, payload)

  let updated: Config

  if (existing) {
    log.info(`Found existing config - start merge`, existing)
    updated = repo.merge(existing, { ...payload, id: existing.id })
  } else {
    log.warn(`Config not found - create new one and merge`, existing)
    updated = repo.create({ ...payload, id: 1 })
  }

  const saved = await repo.save(updated)
  log.success(`Saved`, saved)

  return ConfigMapper.toDTO(saved)
}
