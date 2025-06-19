import { ConfigDTO, ConfigInputDTO } from '@shared/domains/Config/types'

import { Config } from '../types/Config.types'

export function fromDTO(dto: ConfigDTO): Config {
  return {
    outputFolder: dto.outputFolder,
    tempFolder: dto.tempFolder,
    maxThreads: dto.maxThreads,
    autoProcessOnScan: dto.autoProcessOnScan,
    autoArchiveOnComplete: dto.autoArchiveOnComplete,
    useMultithreading: dto.useMultithreading,
    debugMode: dto.debugMode
  }
}

export function toInputDTO(config: Config): ConfigInputDTO {
  return {
    outputFolder: config.outputFolder,
    tempFolder: config.tempFolder,
    maxThreads: config.maxThreads,
    autoProcessOnScan: config.autoProcessOnScan,
    autoArchiveOnComplete: config.autoArchiveOnComplete,
    useMultithreading: config.useMultithreading,
    debugMode: config.debugMode
  }
}

export const ConfigMapper = {
  fromDTO,
  toInputDTO
}
