import { ElectronAPI } from '@electron-toolkit/preload'

import { IpcBridgesCommon } from './domains/Common/ipc-bridges'
import { IpcBridgesConfig } from './domains/Config/ipc-bridges'

declare global {
  interface Window {
    electron: ElectronAPI & IpcBridgesCommon
    api: {
      config: IpcBridgesConfig
    }
  }
}
