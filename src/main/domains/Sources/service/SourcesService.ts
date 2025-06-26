import { AppDataSource } from '@main/database/AppDataSource'
import { SourcesMapper } from '@main/domains/Sources/mappers/SourcesMapper'

import { RemoveDTO } from '@shared/domains/Common/dto/RemoveDTO'
import { SourceCreateDTO, SourceDTO, SourceUpdateDTO } from '@shared/domains/Sources/dto/SourceDTO'
import { createLog } from '@shared/utils/createLog'

import { Source } from '../entities/Source'

const repo = AppDataSource.getRepository(Source)

export class SourcesService {
  static async create(source: SourceCreateDTO): Promise<SourceDTO | null> {
    const log = createLog({ tag: 'SourcesService.create' })

    log.info(`Create a new source with params`, source)

    const existing = await repo.findOneBy({ path: source.path })

    if (existing) {
      log.error(`Found an existing source with the same path`, existing)
      return null
    }

    log.info(`Creating a new source`)

    const created = repo.create(source)
    const saved = await repo.save(created)

    log.success(`New source has been saved`, saved)

    return SourcesMapper.map(saved, Source, SourceDTO)
  }

  static async getAll(): Promise<SourceDTO[] | null> {
    const log = createLog({ tag: 'SourcesService.getAll' })

    const sources = await repo.find({ order: { id: 'ASC' } })

    if (!sources || sources.length === 0) {
      log.error(`Sources are not found`)
      return null
    }

    log.success(`Sources are found`)

    return SourcesMapper.mapArray(sources, Source, SourceDTO)
  }

  static async update(source: SourceUpdateDTO): Promise<SourceDTO | null> {
    const log = createLog({ tag: 'SourcesService.update' })

    const existingSource = await repo.findOneBy({ id: source.id })

    if (existingSource) {
      log.info(`Found existing source - start merge`, existingSource)
      const mergedSource = repo.merge(existingSource, { ...source, id: existingSource.id })
      const savedSource = await repo.save(mergedSource)

      log.success(`Source updated`, savedSource)

      return SourcesMapper.map(savedSource, Source, SourceDTO)
    }

    log.error(`Source "${source.id}" wasn't found - update skipped`)

    return null
  }

  static async remove(source: RemoveDTO): Promise<boolean> {
    const log = createLog({ tag: 'SourcesService.remove' })

    const deleted = await repo.delete({ id: source.id })

    if (deleted) {
      log.info(`Deleted source by id ${source.id}`)
      return true
    }

    log.error(`Source by id "${source.id}" is not deleted`)

    return false
  }
}
