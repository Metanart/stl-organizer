import { AppDataSource } from '@main/database/AppDataSource'
import { Source } from '@main/database/models/common/Source'
import { DBHandler } from '@main/types'

import { SourceCreateDTO, SourceDTO } from '@shared/domains/Sources/types'
import { createLog } from '@shared/utils/createLog'

import { SourcesMapper } from '../SourcesMapper'

export const handleCreate: DBHandler<SourceDTO | null, SourceCreateDTO> = async function (payload) {
  const log = createLog({ ipcTag: 'sources:create' })

  const repo = AppDataSource.getRepository(Source)

  log.info(`Sources payload`, payload)

  const provided = SourcesMapper.fromCreateDTO(payload)
  const existing = await repo.findOneBy({ path: provided.path })

  if (existing) {
    log.info(`Found existing source - stop operation`, existing)
    return null
  }

  log.warn(`Source "${provided.path}" is not found - create new one`)
  const created = repo.create({ ...provided })
  const saved = await repo.save(created)
  log.success(`Saved`, saved)

  return SourcesMapper.toDTO(saved)
}
