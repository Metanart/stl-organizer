import { AppDataSource } from '@main/database/AppDataSource'
import { Source } from '@main/database/models/common/Source'
import { DBHandler } from '@main/types'

import { SourcesDTO } from '@shared/domains/Sources/types'
import { createLog } from '@shared/utils/createLog'

import { mapSourcesToDTO } from '../mappers'

export const handleGetAll: DBHandler<SourcesDTO | null> = async function () {
  const log = createLog({ ipcTag: 'sources:getAll' })

  const repo = AppDataSource.getRepository(Source)

  const entities = await repo.find({ order: { id: 'ASC' } })

  if (!entities) {
    log.error(`Sources are not found`)
    return null
  }

  log.success(`Sources are found`)

  return mapSourcesToDTO(entities)
}
