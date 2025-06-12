import { Response } from '@shared/types/common'

declare global {
  interface Window {
    api: {
      config: {
        get: () => Promise<Response<ConfigState | null>>
        update: (payload: ConfigState) => Promise<Response<ConfigState>>
      }
    }
  }
}
