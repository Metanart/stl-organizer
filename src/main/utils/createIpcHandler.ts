import { DBHandler } from '@main/types'
import { IpcMainInvokeEvent } from 'electron/main'

import { IpcTag } from '@shared/domains/Common/types/ipc.types'
import { createLog } from '@shared/utils/createLog'

export function createIpcHandler<ResponseType, PayloadType = void>(
  tag: IpcTag,
  DBHandlerFn: DBHandler<ResponseType, PayloadType>
) {
  const log = createLog({ channel: tag })

  return async function (_event: IpcMainInvokeEvent, ...args: PayloadType[]) {
    try {
      const response = args[0]
        ? await (DBHandlerFn as DBHandler<ResponseType, PayloadType>)(args[0])
        : await (DBHandlerFn as DBHandler<ResponseType>)()

      if (!response) {
        log.error('Empty response received')
        throw new Error('Empty response received')
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
}
