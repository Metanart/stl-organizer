import { SourceFolder } from '@main/models/common/SourceFolder'

import { IPC_ACTION, IPC_ENTITY } from '@shared/enums/ipc'

declare global {
  interface Window {
    api: {
      [IPC_ENTITY.SOURCE_FOLDERS]: {
        [IPC_ACTION.GET_ALL]: () => Promise<SourceFolder[]>
      }
    }
  }
}
