export type ConfigState = {
  outputFolder: string | null
  tempFolder: string | null
  maxThreads: number
  autoProcessOnScan: boolean
  autoArchiveOnComplete: boolean
  useMultithreading: boolean
  debugMode: boolean
}
