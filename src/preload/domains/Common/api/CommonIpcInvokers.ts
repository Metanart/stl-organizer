import { ipcRenderer } from 'electron'

import { COMMON_IPC_TAGS } from '@shared/domains/Common/ipc/CommonIpcTags'

const { DialogServiceSelectFolder } = COMMON_IPC_TAGS

export const commonIpcInvokers = {
  selectFolder: (): Promise<string | null> => ipcRenderer.invoke(DialogServiceSelectFolder)
} as const

export type CommonIpcInvokers = typeof commonIpcInvokers
