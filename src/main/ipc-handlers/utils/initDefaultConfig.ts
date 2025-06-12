import { AppDataSource } from '@main/database/AppDataSource'
import { Config } from '@main/database/models/common/Config'

import { logger } from '@shared/utils/logger'

const log = logger.withTag('initDefaultConfig')

export async function initDefaultConfig(): Promise<void> {
  const repo = AppDataSource.getRepository(Config)

  const existing = await repo.findOneBy({})

  if (!existing) {
    const defaultConfig = repo.create({
      outputFolder: '',
      tempFolder: '',
      maxThreads: 4,
      autoProcessOnScan: false,
      autoArchiveOnComplete: false,
      useMultithreading: true,
      debugMode: false
    })

    await repo.save(defaultConfig)
    log.success('Default config initialized')
  } else {
    log.info('Config already exists')
  }
}
