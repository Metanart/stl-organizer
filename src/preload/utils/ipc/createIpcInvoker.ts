import { ipcRenderer } from 'electron'

import { ApiResponse } from '@shared/domains/Common/types/Api.types'
import { IpcTag } from '@shared/domains/Common/types/IPC.types'
import { createLog } from '@shared/utils/logs/createLog'

export function createIpcInvoker<R>(tag: IpcTag): () => Promise<ApiResponse<R>> {
  return async function () {
    const log = createLog({ tag, category: 'PRELOAD' })
    log.info(`Invoked ${tag}`)
    return ipcRenderer.invoke(tag)
  }
}

export function createIpcInvokerWithPayload<R, P = void>(
  tag: IpcTag
): (payload: P) => Promise<ApiResponse<R>> {
  return async function (payload) {
    const log = createLog({ tag, category: 'PRELOAD' })

    if (!payload) {
      log.error(`Invoked ${tag} without payload`)
      return { data: null, error: `Invoked ${tag} without payload` }
    } else {
      log.info(`Invoked ${tag} with payload`, payload)
      return ipcRenderer.invoke(tag, payload)
    }
  }
}
