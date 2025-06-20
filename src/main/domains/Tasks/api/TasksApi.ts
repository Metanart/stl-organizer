import { AppDataSource } from '@main/database/AppDataSource'
import { DBHandler } from '@main/types'
import { TaskDTO } from '@preload/domains/Tasks/types/Tasks.types'

import { createLog } from '@shared/utils/createLog'

export class TasksApi {
  static create: DBHandler<TaskDTO | null, TaskDTO> = async function (payload) {
    const log = createLog({ channel: 'TasksApi:create' })

    const repo = AppDataSource.getRepository(Source)

    log.info(`Sources payload`, payload)

    const provided = SourceMapper.fromCreateDTO(payload)
    const existing = await repo.findOneBy({ path: provided.path })

    if (existing) {
      log.info(`Found existing source - stop operation`, existing)
      return null
    }

    log.warn(`Source "${provided.path}" is not found - create new one`)
    const created = repo.create({ ...provided })
    const saved = await repo.save(created)
    log.success(`Saved`, saved)

    return SourceMapper.toDTO(saved)
  }
}
