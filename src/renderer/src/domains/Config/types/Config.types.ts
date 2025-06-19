export type Config = {
  outputFolder: string
  tempFolder: string
  maxThreads: number
  autoProcessOnScan: boolean
  autoArchiveOnComplete: boolean
  useMultithreading: boolean
  debugMode: boolean
}

export type ConfigState = Config

export type ConfigContextType = {
  config: ConfigState | null
  isLoading: boolean
  error?: string | null
  update: (payload: ConfigState) => Promise<void>
}
