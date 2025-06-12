import { consola } from 'consola'

import { Response } from '@shared/types/common'
import { logger } from '@shared/utils/logger'

const log = logger.withTag('createApiHandler')

type ApiHandler<T, P = void> = P extends void
  ? () => Promise<Response<T>>
  : (payload: P) => Promise<Response<T>>

export function createApiHandler<T, P = void>(handlerFn: ApiHandler<T, P>, channel: string) {
  const logger = consola.withTag(channel)

  return async (payload?: P) => {
    try {
      const result = payload
        ? await (handlerFn as ApiHandler<T, P>)(payload)
        : await (handlerFn as ApiHandler<T>)()

      log.log('Api handler result', result)

      return { data: result } as Response<T>
    } catch (error) {
      logger.error((error as Error).message)
      return { data: null, error: (error as Error).message } as Response<T>
    }
  }
}
