import { AppDataSource } from '@main/database/AppDataSource'

import { SourceDTO, SOURCES_DTO_KEYS, SourceUpdateDTO } from '@shared/domains/Sources/Sources.dtos'
import { createLog } from '@shared/utils/createLog'

import { Source } from '../entities/Source'
import { SourcesMapper } from '../mappers/SourcesMapper'

const repo = AppDataSource.getRepository(Source)

export async function updateSource(source: SourceUpdateDTO): Promise<SourceDTO | null> {
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
