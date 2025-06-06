import { ipcRenderer } from 'electron'

import { IPC_ACTION, IPC_ENTITY } from '@shared/enums/ipc'
import { getIpcTag } from '@shared/utils/getIpcTag'

export const SourceFoldersInvokers = {
  [IPC_ACTION.GET_ALL]: () =>
    ipcRenderer.invoke(getIpcTag(IPC_ENTITY.SOURCE_FOLDERS, IPC_ACTION.GET_ALL))
}
