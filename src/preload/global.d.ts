import { ElectronAPI } from '@electron-toolkit/preload'

import { IpcBridgesCommon } from './domains/Common/api/CommonIpcBridges'
import { IpcBridgesConfig } from './domains/Config/api/ConfigIpcBridges'
import { IpcBridgesSources } from './domains/Sources/api/SourcesIpcBridges'

declare global {
  interface Window {
    electron: ElectronAPI & IpcBridgesCommon
    api: {
      config: IpcBridgesConfig
      sources: IpcBridgesSources
    }
  }
}
