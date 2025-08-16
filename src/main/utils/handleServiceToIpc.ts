import { LL } from '@i18n/utils/i18n-LL.sync'
import { ipcMain } from 'electron'
import { IpcMainInvokeEvent } from 'electron/main'

import { ApiResponse } from '@shared/domains/Common/types/Api.types'
import { IpcTag } from '@shared/domains/Common/types/IPC.types'
import { createLog } from '@shared/utils/createLog'

import { convertDBErrorToMessage } from './convertDBErrorToMessage'
import { mapDbError } from './mapDBError'

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
          error: 'Empty response received from service'
        }
      } else {
        return {
          data: response
        }
      }
    } catch (error) {
      log.error('Error', error)

      const dbError = mapDbError(error)

      if (dbError) {
        log.error('DB error', dbError)

        const errorMessage = convertDBErrorToMessage(dbError)

        log.error('DB error message', errorMessage)

        return { error: errorMessage || LL.app.dbErrors.unknown() }
      }

      const errorMessage = error instanceof Error ? error.message : String(error)

      log.error('Error message', errorMessage)

      return {
        error: errorMessage || LL.app.dbErrors.unknown()
      }
    }
  }

  ipcMain.handle(tag, ipcHandler)
}
