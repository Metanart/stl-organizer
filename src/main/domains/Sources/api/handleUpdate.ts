import { AppDataSource } from '@main/database/AppDataSource'
import { Source } from '@main/domains/Sources/entities/Source'
import { DBHandler } from '@main/types'

import { SourceDTO, SourceInputDTO } from '@shared/domains/Sources/types/Source.types'
import { createLog } from '@shared/utils/createLog'

import { SourceMapper } from '../../../../shared/domains/Sources/mappers/SourceMapper'

export const handleUpdate: DBHandler<SourceDTO | null, SourceInputDTO> = async function (payload) {
  const log = createLog({ ipcTag: 'sources:update' })
  const repo = AppDataSource.getRepository(Source)

  log.info(`Sources payload`, payload)

  const provided = SourceMapper.fromInputDTO(payload)
  const existing = await repo.findOneBy({ id: payload.id })

  if (existing) {
    log.info(`Found existing source - start merge`, existing)
    const newInstance = repo.merge(existing, { ...provided, id: existing.id })
    const saved = await repo.save(newInstance)
    log.success(`Saved`, saved)
    return SourceMapper.toDTO(saved)
  }

  log.warn(`Source "${payload.id}" is not found - skip`)
  return null
}
