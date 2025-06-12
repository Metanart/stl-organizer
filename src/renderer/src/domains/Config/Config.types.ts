import { ConfigState } from '@shared/types/config'

export type ConfigContextType = {
  config: ConfigState | null
  isLoading: boolean
  error?: string | null
  update: (payload: ConfigState) => Promise<void>
}
