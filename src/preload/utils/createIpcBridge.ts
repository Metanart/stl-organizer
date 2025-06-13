import { ipcRenderer } from 'electron'

import { IpcInvoker, IpcTag } from '@shared/domains/Common/types/ipc.types'
import { IpcResponse } from '@shared/domains/Common/types/ipc.types'
import { createLog } from '@shared/utils/createLog'

export function createIpcBridge<ResponseType, PayloadType = void>(
  ipcTag: IpcTag
): IpcInvoker<ResponseType, PayloadType> {
  return ((payload?: PayloadType): Promise<IpcResponse<ResponseType>> => {
    const log = createLog({ ipcTag })

    if (payload === undefined) {
      log.info(`Bridge ${ipcTag} without payload`)
      return ipcRenderer.invoke(ipcTag)
    } else {
      log.info(`Bridge ${ipcTag} with payload`, payload)
      return ipcRenderer.invoke(ipcTag, payload)
    }
  }) as IpcInvoker<ResponseType, PayloadType>
}
