// /main/mappers/configMapper.ts
import { Config } from '@main/database/models/common/Config'

import { ConfigDTO } from '@shared/domains/Config/types'

export function mapConfigToDTO(config: Config): ConfigDTO {
  return {
    id: config.id,
    updatedAt: config.updatedAt,
    outputFolder: config.outputFolder,
    tempFolder: config.tempFolder,
    maxThreads: config.maxThreads,
    autoProcessOnScan: config.autoProcessOnScan,
    autoArchiveOnComplete: config.autoArchiveOnComplete,
    useMultithreading: config.useMultithreading,
    debugMode: config.debugMode
  }
}
