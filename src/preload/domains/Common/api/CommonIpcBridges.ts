import { ipcRenderer } from 'electron'

export const ipcBridgesCommon = {
  selectFolder: (): Promise<string | null> => ipcRenderer.invoke('dialog:select-folder')
} as const

export type IpcBridgesCommon = typeof ipcBridgesCommon
