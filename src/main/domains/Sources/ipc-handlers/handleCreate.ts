import { AppDataSource } from '@main/database/AppDataSource'
import { Source } from '@main/database/models/common/Source'
import { DBHandler } from '@main/types'

import { SourceCreateDTO, SourceDTO } from '@shared/domains/Sources/types'
import { createLog } from '@shared/utils/createLog'

import { mapCreateDTOToNewSource, mapSourceToDTO } from '../mappers'

export const handleCreate: DBHandler<SourceDTO | null, SourceCreateDTO> = async function (payload) {
  const log = createLog({ ipcTag: 'sources:create' })

  const repo = AppDataSource.getRepository(Source)

  log.info(`Sources payload`, payload)

  const newSource = mapCreateDTOToNewSource(payload)
  const existing = await repo.findOneBy({ path: newSource.path })

  if (existing) {
    log.info(`Found existing source - stop operation`, existing)
    return null
  }

  log.warn(`Source "${newSource.path}" is not found - create new one`)
  const newInstance = repo.create({ ...newSource })
  const saved = await repo.save(newInstance)
  log.success(`Saved`, saved)

  return mapSourceToDTO(saved)
}
