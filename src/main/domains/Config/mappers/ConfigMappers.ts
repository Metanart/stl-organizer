// /main/mappers/configMapper.ts

import { ConfigEntity } from '@main/domains/Config/entities/Config'

import { ConfigDTO, ConfigInputDTO } from '@shared/domains/Config/types'

import { DEFAULT_CONFIG_ID } from '../const'

function toDTO(config: ConfigEntity): ConfigDTO {
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

function fromInputDTO(dto: ConfigInputDTO): ConfigEntity {
  return {
    id: DEFAULT_CONFIG_ID,
    outputFolder: dto.outputFolder,
    tempFolder: dto.tempFolder,
    maxThreads: dto.maxThreads,
    autoProcessOnScan: dto.autoProcessOnScan,
    autoArchiveOnComplete: dto.autoArchiveOnComplete,
    useMultithreading: dto.useMultithreading,
    debugMode: dto.debugMode
  }
}

export const ConfigMappers = {
  toDTO,
  fromInputDTO
}
