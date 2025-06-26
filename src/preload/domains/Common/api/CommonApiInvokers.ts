import { ipcRenderer } from 'electron'

export const commonApiInvokers = {
  selectFolder: (): Promise<string | null> => ipcRenderer.invoke('DialogService.selectFolder')
} as const

export type CommonApiInvokers = typeof commonApiInvokers
