import { consola } from 'consola'
import { ipcMain, IpcMainInvokeEvent } from 'electron'

import { Response } from '@shared/types/common'

type IpcHandler<T, P = void> = P extends void
  ? () => Promise<T>
  : (event: IpcMainInvokeEvent, payload: P) => Promise<T>

export function registerHandler<T, P = void>(channel: string, handlerFn: IpcHandler<T, P>): void {
  const logger = consola.withTag(channel)

  ipcMain.handle(channel, async (event, ...args): Promise<Response<T>> => {
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
      logger.error(error)
      return {
        data: null,
        error: (error as Error).message || 'Unknown error'
      }
    }
  })
}
