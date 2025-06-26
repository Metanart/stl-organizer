import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge } from 'electron'

import { commonApiInvokers } from './domains/Common/api/CommonApiInvokers'
import { configIpcInvokers } from './domains/Config/api/ConfigIpcInvokers'
import { sourcesIpcInvokers } from './domains/Sources/api/SourcesIpcInvokers'

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', {
      ...electronAPI,
      ...commonApiInvokers
    })
    contextBridge.exposeInMainWorld('api', {
      config: configIpcInvokers,
      sources: sourcesIpcInvokers
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
