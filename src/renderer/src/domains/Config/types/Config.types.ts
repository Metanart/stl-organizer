import { ConfigFormDTO } from '@shared/domains/Config/Config.dtos'

export type ConfigStore = {
  config: ConfigFormDTO | null
  isLoading: boolean
  error: string | null
}

export const ConfigActionTypes = {
  Load: 'config/load',
  Update: 'config/update'
} as const
