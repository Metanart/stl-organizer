import { ipcMain } from 'electron'
import { IpcMainInvokeEvent } from 'electron/main'

import { ApiResponse } from '@shared/domains/Common/types/Api.types'
import { IpcTag } from '@shared/domains/Common/types/IPC.types'
import { createLog } from '@shared/utils/createLog'

type ServiceHandler<R, P> = (() => Promise<R>) | ((payload: P) => Promise<R>)

export function handleServiceToIpc<R, P = void>(
  tag: IpcTag,
  serviceHandler: ServiceHandler<R, P>
): void {
  const log = createLog({ tag })

  const ipcHandler = async function (
    _event: IpcMainInvokeEvent,
    ...args: P[]
  ): Promise<ApiResponse<R>> {
    try {
      const response = args[0]
        ? await (serviceHandler satisfies (payload: P) => Promise<R>)(args[0])
        : await (serviceHandler as () => Promise<R>)()

      if (!response) {
        log.error('Empty response received')
        return {
          data: null,
          error: 'Empty response received from service'
        }
      } else {
        return {
          data: response,
          error: null
        }
      }
    } catch (error) {
      log.error(error)
      return {
        data: null,
        error: (error as Error).message || 'Unknown error'
      }
    }
  }

  ipcMain.handle(tag, ipcHandler)
}
