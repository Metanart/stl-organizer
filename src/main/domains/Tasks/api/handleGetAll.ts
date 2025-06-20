import { AppDataSource } from '@main/database/AppDataSource'
import { Source } from '@main/domains/Sources/entities/Source'
import { DBHandler } from '@main/types'

import { SourceDTO } from '@shared/domains/Sources/types/Source.types'
import { createLog } from '@shared/utils/createLog'

export const handleGetAll: DBHandler<SourceDTO[] | null> = async function () {
  const log = createLog({ ipcTag: 'sources:getAll' })

  const repo = AppDataSource.getRepository(Source)

  const entities = await repo.find({ order: { id: 'ASC' } })

  if (!entities) {
    log.error(`Sources are not found`)
    return null
  }

  log.success(`Sources are found`)

  return TasksMapper.toDTOs(entities)
}
