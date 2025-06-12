import { AppDataSource } from '@main/database/AppDataSource'
import { SourceFolder } from '@main/database/models/common/SourceFolder'
import { DeleteResult } from 'typeorm'

import { IPC_ACTION, IPC_ENTITY } from '@shared/enums/ipc'
import { getIpcTag } from '@shared/utils/getIpcTag'

import { registerIpcHandler } from './utils/registerIpcHandler'

const baseTag = IPC_ENTITY.SOURCE_FOLDERS

registerIpcHandler<SourceFolder[]>(getIpcTag(baseTag, IPC_ACTION.GET_ALL), async () => {
  const repo = AppDataSource.getRepository(SourceFolder)
  return await repo.find({
    order: { createdAt: 'DESC' }
  })
})

registerIpcHandler<SourceFolder, Partial<SourceFolder>>(
  getIpcTag(baseTag, IPC_ACTION.CREATE),
  async (_event, payload: Partial<SourceFolder>) => {
    const repo = AppDataSource.getRepository(SourceFolder)
    const folder = repo.create(payload)
    return await repo.save(folder)
  }
)

registerIpcHandler<SourceFolder, Partial<SourceFolder> & { id: number }>(
  getIpcTag(baseTag, IPC_ACTION.UPDATE),
  async (_event, payload: Partial<SourceFolder> & { id: number }) => {
    const repo = AppDataSource.getRepository(SourceFolder)
    const existing = await repo.findOneByOrFail({ id: payload.id })
    const updated = repo.merge(existing, payload)
    return await repo.save(updated)
  }
)

registerIpcHandler<DeleteResult, { id: number }>(
  getIpcTag(baseTag, IPC_ACTION.DELETE),
  async (_event, payload: { id: number }) => {
    const repo = AppDataSource.getRepository(SourceFolder)
    return await repo.delete(payload.id)
  }
)
