import { AppDataSource } from '@main/database/AppDataSource'
import { Source } from '@main/database/models/common/Source'
import { DBHandler } from '@main/types'

import { SourceInputDTO, SourcesDTO } from '@shared/domains/Sources/types'
import { createLog } from '@shared/utils/createLog'

import { mapDTOToSource, mapSourcesToDTO } from '../mappers'

export const handleCreate: DBHandler<SourcesDTO | null, SourceInputDTO> = async function (payload) {
  const log = createLog({ ipcTag: 'sources:create' })

  const repo = AppDataSource.getRepository(Source)

  log.info(`Sources payload`, payload)

  const newSource = mapDTOToSource(payload)
  const existing = await repo.findOneBy({ path: newSource.path })

  if (existing) {
    log.info(`Found existing source - stop operation`, existing)
    return null
  }

  log.warn(`Source "${newSource.path}" is not found - create new one`)
  const newInstance = repo.create({ ...newSource })
  const saved = await repo.save(newInstance)
  log.success(`Saved`, saved)

  const entities = await repo.find({ order: { id: 'ASC' } })

  return mapSourcesToDTO(entities)
}
