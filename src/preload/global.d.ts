import { ElectronAPI } from '@electron-toolkit/preload'

import { ConfigApiInvokers } from './domains/Config/api/ConfigIpcInvokers'
import { SourcesIpcInvokers } from './domains/Sources/api/SourcesIpcInvokers'

declare global {
  interface Window {
    electron: ElectronAPI & IpcBridgesCommon
    api: {
      config: ConfigApiInvokers
      sources: SourcesIpcInvokers
    }
  }
}
