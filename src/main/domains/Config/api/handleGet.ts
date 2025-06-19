import { AppDataSource } from '@main/database/AppDataSource'
import { Config } from '@main/domains/Config/entities/Config'
import { DBHandler } from '@main/types'

import { ConfigDTO } from '@shared/domains/Config/types'
import { createLog } from '@shared/utils/createLog'

import { ConfigMappers } from '../mappers/ConfigMappers'
import { DEFAULT_CONFIG_ID } from '../const'

export const handleGet: DBHandler<ConfigDTO | null> = async function () {
  const log = createLog({ ipcTag: 'config:get' })

  const repo = AppDataSource.getRepository(Config)
  const entity = await repo.findOne({ where: { id: DEFAULT_CONFIG_ID } })

  if (!entity) {
    log.error(`Config not found`)
    return null
  }

  log.success(`Config found`)

  return ConfigMappers.toDTO(entity)
}
