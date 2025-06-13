import { AppDataSource } from '@main/database/AppDataSource'
import { Config } from '@main/database/models/common/Config'
import { mapConfigToDTO } from '@main/domains/Config/mappers'
import { DBHandler } from '@main/types'

import { ConfigDTO } from '@shared/domains/Config/types'
import { createLog } from '@shared/utils/createLog'

export const handleGet: DBHandler<ConfigDTO | null> = async function () {
  const log = createLog({ ipcTag: 'config:get' })

  const repo = AppDataSource.getRepository(Config)
  const entity = await repo.findOne({ where: { id: 1 } })

  if (!entity) {
    log.error(`Config not found`)
    return null
  }

  log.success(`Config found`)

  return mapConfigToDTO(entity)
}
