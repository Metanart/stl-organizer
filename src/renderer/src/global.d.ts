import { SourceFolder } from '@main/models/common/SourceFolder'

import { IPC_ACTION, IPC_ENTITY } from '@shared/enums/ipc'
import { IpcResponse } from '@shared/types/ipc'

declare global {
  interface Window {
    api: {
      [IPC_ENTITY.SOURCE_FOLDERS]: {
        [IPC_ACTION.GET_ALL]: () => IpcResponse<SourceFolder[]>
        [IPC_ACTION.CREATE]: (payload: Partial<SourceFolder>) => IpcResponse<SourceFolder>
        [IPC_ACTION.UPDATE]: (
          payload: Partial<SourceFolder> & { id: number }
        ) => IpcResponse<SourceFolder>
        [IPC_ACTION.DELETE]: (id: number) => IpcResponse<null>
      }
      [IPC_ENTITY.CONFIG]: {
        [IPC_ACTION.GET_ALL]: () => IpcResponse<ConfigState>
        [IPC_ACTION.UPDATE]: (payload: Partial<ConfigState>) => IpcResponse<ConfigState>
      }
    }
  }
}
