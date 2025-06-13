export type ConfigDTO = {
  id: number
  outputFolder: string
  tempFolder: string
  maxThreads: number
  autoProcessOnScan: boolean
  autoArchiveOnComplete: boolean
  useMultithreading: boolean
  debugMode: boolean
  updatedAt: Date
}

export type ConfigInputDTO = Omit<ConfigDTO, 'id' | 'createdAt' | 'updatedAt'>
