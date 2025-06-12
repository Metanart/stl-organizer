import { ipcRenderer } from 'electron'

import { IpcTag } from '@shared/types/ipc-tags'
import { createLog } from '@shared/utils/createLog'

/**
 * Typed wrapper for ipcRenderer.invoke that adapts to presence/absence of payload.
 *
 * @param ipcTag - The IPC channel name.
 * @returns A function that takes a payload (if required) and returns a Promise of result.
 */
export function invokeIpcHandler<P = void, R = unknown>(
  ipcTag: IpcTag
): P extends void ? () => Promise<R> : (payload: P) => Promise<R> {
  return ((payload?: P): Promise<R> => {
    const log = createLog({ ipcTag })

    if (payload === undefined) {
      log.info(`Invoking ${ipcTag} handler without payload`)
      return ipcRenderer.invoke(ipcTag)
    } else {
      log.info(`Invoking ${ipcTag} handler with payload`, ipcTag, payload)
      return ipcRenderer.invoke(ipcTag, payload)
    }
  }) as P extends void ? () => Promise<R> : (payload: P) => Promise<R>
}
