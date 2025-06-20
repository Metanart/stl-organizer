import { AppDataSource } from '@main/database/AppDataSource'

import { createLog } from '@shared/utils/createLog'

import { Task } from '../entities/Task'

const repo = AppDataSource.getRepository(Task)

export class TaskService {
  static async getAll(): Promise<Task[] | null> {
    const log = createLog({ channel: 'TaskService:getAll' })

    const entities = await repo.find({ order: { id: 'ASC' } })

    if (!entities) {
      log.error(`Sources are not found`)
      return null
    }

    log.success(`Sources are found`)

    return entities
  }
}
