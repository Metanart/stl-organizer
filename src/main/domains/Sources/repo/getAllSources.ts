import { AppDataSource } from '@main/database/AppDataSource'

import { SourceDTO, SOURCES_DTO_KEYS } from '@shared/domains/Sources/Sources.dtos'
import { createLog } from '@shared/utils/logs/createLog'

import { Source } from '../entities/Source'
import { SourcesMapper } from '../mappers/SourcesMapper'

const repo = AppDataSource.getRepository(Source)

export async function getAllSources(): Promise<SourceDTO[] | null> {
  const log = createLog({ tag: 'SourcesRepo.getAll' })

  let sources: Source[]

  try {
    sources = await repo.find({ order: { createdAt: 'ASC' } })
  } catch (error) {
    log.error('Failed to query sources from database:', (error as Error).message)
    throw error
  }

  if (sources.length === 0) {
    log.info(`Sources are empty`)
    return []
  }

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
