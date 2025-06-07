import { SourceFolder } from '@main/models/common/SourceFolder'

import { IPC_ACTION, IPC_ENTITY } from '@shared/enums/ipc'
import { Response } from '@shared/types/common'

declare global {
  interface Window {
    api: {
      [IPC_ENTITY.SOURCE_FOLDERS]: {
        [IPC_ACTION.GET_ALL]: () => Promise<Response<SourceFolder[]>>
        [IPC_ACTION.CREATE]: (payload: Partial<SourceFolder>) => Promise<Response<SourceFolder>>
        [IPC_ACTION.UPDATE]: (
          payload: Partial<SourceFolder> & { id: number }
        ) => Promise<Response<SourceFolder>>
        [IPC_ACTION.DELETE]: (id: number) => Promise<Response<null>>
      }
      [IPC_ENTITY.CONFIG]: {
        [IPC_ACTION.GET]: () => Promise<Response<ConfigState | null>>
        [IPC_ACTION.UPDATE]: (payload: Partial<ConfigState>) => Promise<Response<ConfigState>>
      }
    }
  }
}
