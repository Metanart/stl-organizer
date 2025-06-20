import { AppDataSource } from '@main/database/AppDataSource'
import { DBHandler } from '@main/types'

import { SourceCreateDTO, SourceDTO } from '@shared/domains/Sources/types/Source.types'
import { createLog } from '@shared/utils/createLog'

import { Source } from '../entities/Source'
import { SourceMapper } from '../../../../shared/domains/Sources/mappers/SourceMapper'

export const repo = AppDataSource.getRepository(Source)

export class SourcesApi {
  static create: DBHandler<SourceDTO | null, SourceCreateDTO> = async function (payload) {
    const log = createLog({ ipcTag: 'sources:create' })

    log.info(`Create a new source with payload`, payload)

    const provided = SourceMapper.fromCreateDTO(payload)
    const existing = await repo.findOneBy({ path: provided.path })

    if (existing) {
      log.info(`Found an existing source - stopping the operation`, existing)
      return null
    }

    log.warn(`Source with path "${provided.path}" is not found - create a new one`)
    const created = repo.create({ ...provided })
    const saved = await repo.save(created)
    log.success(`Saved`, saved)

    return SourceMapper.toDTO(saved)
  }
}
