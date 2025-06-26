import { ElectronAPI } from '@electron-toolkit/preload'

import { CommonIpcInvokers } from './domains/Common/api/CommonIpcInvokers'
import { ConfigIpcInvokers } from './domains/Config/api/ConfigIpcInvokers'
import { SourcesIpcInvokers } from './domains/Sources/api/SourcesIpcInvokers'

declare global {
  interface Window {
    electron: ElectronAPI & CommonIpcInvokers
    api: {
      config: ConfigIpcInvokers
      sources: SourcesIpcInvokers
    }
  }
}
