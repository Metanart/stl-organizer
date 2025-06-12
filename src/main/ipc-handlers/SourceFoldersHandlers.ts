import { AppDataSource } from '@main/database/AppDataSource'
import { SourceFolder } from '@main/database/models/common/SourceFolder'
import { DeleteResult } from 'typeorm'

import { registerIpcHandler } from './utils/registerIpcHandler'

registerIpcHandler<SourceFolder[]>('sourceFolders:getAll', async () => {
  const repo = AppDataSource.getRepository(SourceFolder)
  return await repo.find({
    order: { createdAt: 'DESC' }
  })
})

registerIpcHandler<SourceFolder, Partial<SourceFolder>>(
  'sourceFolders:create',
  async (_event, payload: Partial<SourceFolder>) => {
    const repo = AppDataSource.getRepository(SourceFolder)
    const folder = repo.create(payload)
    return await repo.save(folder)
  }
)

registerIpcHandler<SourceFolder, Partial<SourceFolder> & { id: number }>(
  'sourceFolders:update',
  async (_event, payload: Partial<SourceFolder> & { id: number }) => {
    const repo = AppDataSource.getRepository(SourceFolder)
    const existing = await repo.findOneByOrFail({ id: payload.id })
    const updated = repo.merge(existing, payload)
    return await repo.save(updated)
  }
)

registerIpcHandler<DeleteResult, { id: number }>(
  'sourceFolders:delete',
  async (_event, payload: { id: number }) => {
    const repo = AppDataSource.getRepository(SourceFolder)
    return await repo.delete(payload.id)
  }
)
