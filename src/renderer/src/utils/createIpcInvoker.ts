import {
  IpcInvoker,
  IpcInvokerNoPayload,
  IpcInvokerWithPayload,
  IpcResponse,
  IpcTag
} from '@shared/domains/Common/types/ipc.types'
import { createLog } from '@shared/utils/createLog'

export type IpcInvokerWrapper<ResponseType, PayloadType> = (
  payload?: PayloadType
) => Promise<IpcResponse<ResponseType>>

export function createIpcInvoker<ResponseType, PayloadType = void>(
  invokerFn: IpcInvoker<ResponseType, PayloadType>,
  ipcTag: IpcTag
): IpcInvokerWrapper<ResponseType, PayloadType> {
  const log = createLog({ ipcTag })

  return async (payload?: PayloadType) => {
    try {
      const result = payload
        ? await (invokerFn as IpcInvokerWithPayload<ResponseType, PayloadType>)(payload)
        : await (invokerFn as IpcInvokerNoPayload<ResponseType>)()

      if (payload) {
        log.info(`Called ${ipcTag} handler with payload`, payload)
      }

      log.info(`Called ${ipcTag} handler with result`, result)

      return result
    } catch (error) {
      log.error((error as Error).message)
      return { data: null, error: (error as Error).message } satisfies IpcResponse<ResponseType>
    }
  }
}
