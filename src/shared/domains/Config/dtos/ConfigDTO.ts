export type ConfigDTO = {
  id: string
  outputFolder: string
  tempFolder: string
  maxThreads: number
  autoProcessOnScan: boolean
  autoArchiveOnComplete: boolean
  useMultithreading: boolean
  debugMode: boolean
}

export type ConfigFormDTO = ConfigDTO

export type ConfigCreateDTO = {
  outputFolder?: string
  tempFolder?: string
  maxThreads?: number
  autoProcessOnScan?: boolean
  autoArchiveOnComplete?: boolean
  useMultithreading?: boolean
  debugMode?: boolean
}

export type ConfigUpdateDTO = {
  id: string
  outputFolder?: string
  tempFolder?: string
  maxThreads?: number
  autoProcessOnScan?: boolean
  autoArchiveOnComplete?: boolean
  useMultithreading?: boolean
  debugMode?: boolean
}

export type ConfigUpdateFormDTO = ConfigUpdateDTO

export enum CONFIG_DTO_KEYS {
  Config = 'Config',
  ConfigDTO = 'ConfigDTO',
  ConfigFormDTO = 'ConfigFormDTO',
  ConfigCreateDTO = 'ConfigCreateDTO',
  ConfigUpdateDTO = 'ConfigUpdateDTO',
  ConfigUpdateFormDTO = 'ConfigUpdateFormDTO'
}
