import { Response } from '@shared/types/common'
import { IpcTag } from '@shared/types/ipc-tags'
import { createLog } from '@shared/utils/createLog'

type ApiHandler<T, P = void> = P extends void
  ? () => Promise<Response<T>>
  : (payload: P) => Promise<Response<T>>

export function createIpcHandler<T, P = void>(handlerFn: ApiHandler<T, P>, ipcTag: IpcTag) {
  const log = createLog({ ipcTag })

  return async (payload?: P) => {
    try {
      const result = payload
        ? await (handlerFn as ApiHandler<T, P>)(payload)
        : await (handlerFn as ApiHandler<T>)()

      if (payload) {
        log.info(`Called ${ipcTag} handler with payload`, payload)
      }

      log.info(`Called ${ipcTag} handler with result`, result)

      return result
    } catch (error) {
      log.error((error as Error).message)
      return { data: null, error: (error as Error).message } as Response<T>
    }
  }
}
