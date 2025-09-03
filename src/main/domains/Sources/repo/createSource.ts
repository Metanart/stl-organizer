import { AppDataSource } from '@main/database/AppDataSource'

import { SourceCreateDTO, SourceDTO, SOURCES_DTO_KEYS } from '@shared/domains/Sources/Sources.dtos'
import { createLog } from '@shared/utils/createLog'

import { Source } from '../entities/Source'
import { SourcesMapper } from '../mappers/SourcesMapper'

const repo = AppDataSource.getRepository(Source)

export async function createSource(source: SourceCreateDTO): Promise<SourceDTO | null> {
  const log = createLog({ tag: 'SourcesRepo.create' })

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
