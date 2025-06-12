import { ipcMain, IpcMainInvokeEvent } from 'electron'

import { Response } from '@shared/types/common'
import { IpcTag } from '@shared/types/ipc-tags'
import { createLog } from '@shared/utils/createLog'

const log = createLog({ channel: 'registerIpcHandler' })

type IpcHandler<T, P = void> = P extends void
  ? () => Promise<T>
  : (event: IpcMainInvokeEvent, payload: P) => Promise<T>

export function registerIpcHandler<T, P = void>(tag: IpcTag, handlerFn: IpcHandler<T, P>): void {
  ipcMain.handle(tag, async (event, ...args): Promise<Response<T>> => {
    try {
      const result =
        args.length === 0
          ? await (handlerFn as () => Promise<T>)()
          : await (handlerFn as (event: IpcMainInvokeEvent, payload: P) => Promise<T>)(
              event,
              args[0]
            )
      return { data: result }
    } catch (error) {
      log.error(error)
      return {
        data: null,
        error: (error as Error).message || 'Unknown error'
      }
    }
  })
}
