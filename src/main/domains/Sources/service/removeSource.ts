import { AppDataSource } from '@main/database/AppDataSource'

import { RemoveDTO } from '@shared/domains/Common/Common.dtos'
import { createLog } from '@shared/utils/createLog'

import { Source } from '../entities/Source'

const repo = AppDataSource.getRepository(Source)

export async function removeSource(source: RemoveDTO): Promise<boolean> {
  const log = createLog({ tag: 'SourcesRepo.remove' })

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
