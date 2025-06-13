import { ConfigDTO, ConfigInputDTO } from '@shared/domains/Config/types'

import { ConfigState } from '../../types'

export function mapFromDTOToConfigState(dto: ConfigDTO): ConfigState {
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

export function mapFromConfigStateToDTO(state: ConfigState): ConfigInputDTO {
  return {
    outputFolder: state.outputFolder,
    tempFolder: state.tempFolder,
    maxThreads: state.maxThreads,
    autoProcessOnScan: state.autoProcessOnScan,
    autoArchiveOnComplete: state.autoArchiveOnComplete,
    useMultithreading: state.useMultithreading,
    debugMode: state.debugMode
  }
}
