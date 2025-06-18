import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge } from 'electron'

import { ipcBridgesCommon } from './domains/Common/ipc-bridges'
import { ipcBridgesConfig } from './domains/Config/ipc-bridges'
import { ipcBridgesSources } from './domains/Sources/api/SourcesIpcBridges'

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', {
      ...electronAPI,
      ...ipcBridgesCommon
    })
    contextBridge.exposeInMainWorld('api', {
      config: ipcBridgesConfig,
      sources: ipcBridgesSources
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
