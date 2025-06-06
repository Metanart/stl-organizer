import { AppDataSource } from '@main/AppDataSource'
import { SourceFolder } from '@main/models/common/SourceFolder'
import { ipcMain } from 'electron'

import { IPC_ACTION, IPC_ENTITY } from '@shared/enums/ipc'
import { IpcResponse } from '@shared/types/ipc'
import { getIpcTag } from '@shared/utils/getIpcTag'

const baseTag = IPC_ENTITY.SOURCE_FOLDERS

ipcMain.handle(getIpcTag(baseTag, IPC_ACTION.GET_ALL), async (): IpcResponse<SourceFolder[]> => {
  try {
    const repo = AppDataSource.getRepository(SourceFolder)

    const data = await repo.find({
      relations: {
        config: true
      },
      order: { createdAt: 'DESC' }
    })
    return { success: true, data }
  } catch (error) {
    console.error(`[IPC ERROR] ${IPC_ACTION.GET_ALL}`, error)
    return { success: false, error: (error as Error).message }
  }
})

ipcMain.handle(
  getIpcTag(baseTag, IPC_ACTION.CREATE),
  async (_event, payload: Partial<SourceFolder>): IpcResponse<SourceFolder> => {
    try {
      const repo = AppDataSource.getRepository(SourceFolder)
      const folder = repo.create(payload)
      const saved = await repo.save(folder)
      return { success: true, data: saved }
    } catch (error) {
      console.error(`[IPC ERROR] ${IPC_ACTION.CREATE}`, error)
      return { success: false, error: (error as Error).message }
    }
  }
)

ipcMain.handle(
  getIpcTag(baseTag, IPC_ACTION.UPDATE),
  async (_event, payload: Partial<SourceFolder> & { id: number }): IpcResponse<SourceFolder> => {
    try {
      const repo = AppDataSource.getRepository(SourceFolder)
      const existing = await repo.findOneByOrFail({ id: payload.id })
      const updated = repo.merge(existing, payload)
      const saved = await repo.save(updated)
      return { success: true, data: saved }
    } catch (error) {
      console.error(`[IPC ERROR] ${IPC_ACTION.UPDATE}`, error)
      return { success: false, error: (error as Error).message }
    }
  }
)

ipcMain.handle(
  getIpcTag(baseTag, IPC_ACTION.DELETE),
  async (_event, id: number): IpcResponse<null> => {
    try {
      const repo = AppDataSource.getRepository(SourceFolder)
      await repo.delete(id)
      return { success: true, data: null }
    } catch (error) {
      console.error(`[IPC ERROR] ${IPC_ACTION.DELETE}`, error)
      return { success: false, error: (error as Error).message }
    }
  }
)
