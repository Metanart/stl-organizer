import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

import { ConfigState } from '@shared/types/config'

import { invokeIpcHandler } from './utils/invokeIpcHandler'

// Custom APIs for renderer
const api = {
  config: {
    get: invokeIpcHandler<void, ConfigState | null>('config:get'),
    update: invokeIpcHandler<ConfigState, ConfigState>('config:update')
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', {
      ...electronAPI,
      selectFolder: (): Promise<string | null> => ipcRenderer.invoke('dialog:select-folder')
    })
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
