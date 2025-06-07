import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

import { IPC_ACTION, IPC_ENTITY } from '@shared/enums/ipc'
import { getIpcTag } from '@shared/utils/getIpcTag'

// Custom APIs for renderer
const api = {
  [IPC_ENTITY.CONFIG]: {
    [IPC_ACTION.GET]: () => ipcRenderer.invoke(getIpcTag(IPC_ENTITY.CONFIG, IPC_ACTION.GET)),
    [IPC_ACTION.UPDATE]: () => ipcRenderer.invoke(getIpcTag(IPC_ENTITY.CONFIG, IPC_ACTION.UPDATE))
  },
  [IPC_ENTITY.SOURCE_FOLDERS]: {
    [IPC_ACTION.GET_ALL]: () =>
      ipcRenderer.invoke(getIpcTag(IPC_ENTITY.SOURCE_FOLDERS, IPC_ACTION.GET_ALL)),
    [IPC_ACTION.UPDATE]: () =>
      ipcRenderer.invoke(getIpcTag(IPC_ENTITY.SOURCE_FOLDERS, IPC_ACTION.UPDATE)),
    [IPC_ACTION.CREATE]: () =>
      ipcRenderer.invoke(getIpcTag(IPC_ENTITY.SOURCE_FOLDERS, IPC_ACTION.CREATE)),
    [IPC_ACTION.DELETE]: (id: number) =>
      ipcRenderer.invoke(getIpcTag(IPC_ENTITY.SOURCE_FOLDERS, IPC_ACTION.DELETE), id)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
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
