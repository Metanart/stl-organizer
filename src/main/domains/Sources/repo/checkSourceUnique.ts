import { AppDataSource } from '@main/database/AppDataSource'

import { SourceCreateDTO } from '@shared/domains/Sources/Sources.dtos'
import { createLog } from '@shared/utils/logs/createLog'

import { Source } from '../entities/Source'

const repo = AppDataSource.getRepository(Source)

export async function checkSourceUnique(source: SourceCreateDTO): Promise<{
  isUnique: boolean
  conflicts: {
    name: boolean
    path: boolean
  }
}> {
  const log = createLog({ tag: 'SourcesRepo.checkUnique' })

  log.info('Checking Unique for source', { name: source.name, path: source.path })

  let existingSources: Source[]

  try {
    existingSources = await repo.find({
      where: [{ name: source.name }, { path: source.path }]
    })
  } catch (error) {
    log.error('Failed to check source Unique in database:', (error as Error).message)
    throw error
  }

  const conflicts = {
    name: existingSources.some((existingSource) => existingSource.name === source.name),
    path: existingSources.some((existingSource) => existingSource.path === source.path)
  }

  const isUnique = !conflicts.name && !conflicts.path

  if (isUnique) {
    log.info('Source is unique - no conflicts found')
  } else {
    log.warn('Source has conflicts', conflicts)
  }

  return {
    isUnique,
    conflicts
  }
}
