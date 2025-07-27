import z from 'zod'

import { ConfigUpdateFormSchema } from './Config.schemes'

export type ConfigDTO = {
  outputFolder: string
  tempFolder: string
  maxThreads: number
  autoProcessOnScan: boolean
  autoArchiveOnComplete: boolean
  useMultithreading: boolean
  debugMode: boolean
}

export type ConfigFormDTO = {
  outputFolder: string
  tempFolder: string
  maxThreads: number
  autoProcessOnScan: boolean
  autoArchiveOnComplete: boolean
  useMultithreading: boolean
  debugMode: boolean
}

export type ConfigUpdateDTO = {
  outputFolder?: string
  tempFolder?: string
  maxThreads?: number
  autoProcessOnScan?: boolean
  autoArchiveOnComplete?: boolean
  useMultithreading?: boolean
  debugMode?: boolean
}

export type ConfigUpdateFormDTO = z.infer<typeof ConfigUpdateFormSchema>

export enum CONFIG_DTO_KEYS {
  Config = 'Config',
  ConfigDTO = 'ConfigDTO',
  ConfigFormDTO = 'ConfigFormDTO',
  ConfigUpdateDTO = 'ConfigUpdateDTO',
  ConfigUpdateFormDTO = 'ConfigUpdateFormDTO'
}
