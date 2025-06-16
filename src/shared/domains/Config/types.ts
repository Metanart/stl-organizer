export type ConfigDTO = {
  outputFolder: string
  tempFolder: string
  maxThreads: number
  autoProcessOnScan: boolean
  autoArchiveOnComplete: boolean
  useMultithreading: boolean
  debugMode: boolean
}

export type ConfigInputDTO = ConfigDTO
