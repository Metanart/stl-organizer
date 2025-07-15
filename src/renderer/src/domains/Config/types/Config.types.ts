import { ConfigFormDTO } from '@shared/domains/Config/dtos/ConfigDTO'

export type ConfigStore = {
  config: ConfigFormDTO | null
  isLoading: boolean
  error: string | null
}

export const ConfigActionTypes = {
  Load: 'config/load',
  Update: 'config/update'
} as const
