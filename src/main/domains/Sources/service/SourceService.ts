import { createLog } from '@shared/utils/createLog'

import { repo } from '../api/SourcesApi'
import { Source, SourceCreate } from '../entities/Source'

export class SourcesService {
  static async create(sourceCreate: SourceCreate): Promise<Source | null> {
    const log = createLog({ channel: 'SourcesService:create' })

    log.info(`Create a new source with params`, sourceCreate)

    const existing = await repo.findOneBy({ path: sourceCreate.path })

    if (existing) {
      log.error(`Found an existing source with the same path`, existing)
      return null
    }

    log.info(`Creating a new source`)

    const created = repo.create(sourceCreate)
    const saved = await repo.save(created)

    log.success(`New source has been saved`, saved)

    return saved
  }
}
