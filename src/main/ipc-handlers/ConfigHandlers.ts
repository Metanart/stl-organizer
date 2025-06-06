import { AppDataSource } from '@main/AppDataSource'
import { SourceFolder } from '@main/models/common/SourceFolder'
import { ipcMain } from 'electron'

ipcMain.handle('Config:getAll', async () => {
  const repo = AppDataSource.getRepository(SourceFolder)
  return await repo.find({
    relations: {
      config: true
    },
    order: { createdAt: 'DESC' }
  })
})
