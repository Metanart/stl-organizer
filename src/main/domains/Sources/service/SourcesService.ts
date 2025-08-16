import { AppDataSource } from '@main/database/AppDataSource'
import { SourcesMapper } from '@main/domains/Sources/mappers/SourcesMapper'

import { RemoveDTO } from '@shared/domains/Common/Common.dtos'
import {
  SourceCreateDTO,
  SourceDTO,
  SOURCES_DTO_KEYS,
  SourceUpdateDTO
} from '@shared/domains/Sources/Sources.dtos'
import { createLog } from '@shared/utils/createLog'

import { Source } from '../entities/Source'

const repo = AppDataSource.getRepository(Source)

export class SourcesService {
  static async create(source: SourceCreateDTO): Promise<SourceDTO | null> {
    const log = createLog({ tag: 'SourcesService.create' })

    log.info(`Create a new source with params`, source)

    let created: Source
    let saved: Source

    try {
      created = repo.create(source)
      saved = await repo.save(created)
      log.success(`New source has been saved`, saved)
    } catch (error) {
      log.error('Failed to create and save source:', (error as Error).message)
      throw error
    }

    let mappedDTO: SourceDTO
    try {
      mappedDTO = SourcesMapper.map<Source, SourceDTO>(
        saved,
        SOURCES_DTO_KEYS.Source,
        SOURCES_DTO_KEYS.SourceDTO
      )
      log.info('Mapped source to DTO', mappedDTO)
    } catch (error) {
      log.error('Failed to map source to DTO:', (error as Error).message)
      throw error
    }

    return mappedDTO
  }

  static async getAll(): Promise<SourceDTO[] | null> {
    const log = createLog({ tag: 'SourcesService.getAll' })

    let sources: Source[]

    try {
      sources = await repo.find({ order: { createdAt: 'ASC' } })
    } catch (error) {
      log.error('Failed to query sources from database:', (error as Error).message)
      throw error
    }

    if (!sources || sources.length === 0) {
      log.error(`Sources are not found`)
      return null
    }

    log.success(`Sources are found`)

    let mappedDTOs: SourceDTO[]
    try {
      mappedDTOs = SourcesMapper.mapArray<Source, SourceDTO>(
        sources,
        SOURCES_DTO_KEYS.Source,
        SOURCES_DTO_KEYS.SourceDTO
      )
      log.info('Mapped sources to DTOs', mappedDTOs)
    } catch (error) {
      log.error('Failed to map sources to DTOs:', (error as Error).message)
      throw error
    }

    return mappedDTOs
  }

  static async update(source: SourceUpdateDTO): Promise<SourceDTO | null> {
    const log = createLog({ tag: 'SourcesService.update' })

    log.info('Updating source with payload', source)

    let existingSource: Source | null

    try {
      existingSource = await repo.findOne({ where: { id: source.id } })
    } catch (error) {
      log.error('Failed to fetch existing source from database:', (error as Error).message)
      throw error
    }

    if (existingSource) {
      log.info(`Found existing source - start merge`, existingSource)

      let mergedSource: Source
      let savedSource: Source

      try {
        mergedSource = repo.merge(existingSource, { ...source, id: existingSource.id })
        savedSource = await repo.save(mergedSource)
        log.success(`Source updated`, savedSource)
      } catch (error) {
        log.error('Failed to merge and save source:', (error as Error).message)
        throw error
      }

      let mappedDTO: SourceDTO
      try {
        mappedDTO = SourcesMapper.map<Source, SourceDTO>(
          savedSource,
          SOURCES_DTO_KEYS.Source,
          SOURCES_DTO_KEYS.SourceDTO
        )
        log.info('Mapped updated source to DTO', mappedDTO)
      } catch (error) {
        log.error('Failed to map updated source:', (error as Error).message)
        throw error
      }

      return mappedDTO
    }

    log.error(`Source wasn't found - update skipped`)

    return null
  }

  static async remove(source: RemoveDTO): Promise<boolean> {
    const log = createLog({ tag: 'SourcesService.remove' })

    log.info('Removing source with id', source.id)

    let deleted: { affected?: number | null }

    try {
      deleted = await repo.delete({ id: source.id })
    } catch (error) {
      log.error('Failed to delete source from database:', (error as Error).message)
      throw error
    }

    if (deleted.affected && deleted.affected > 0) {
      log.info(`Deleted source by id ${source.id}`)
      return true
    }

    log.error(`Source by id "${source.id}" is not deleted`)

    return false
  }
}
