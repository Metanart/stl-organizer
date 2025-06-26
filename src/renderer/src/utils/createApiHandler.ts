import { ApiHandlerNoPayload, ApiResponse, ApiTag } from '@shared/domains/Common/types/Api.types'
import { createLog } from '@shared/utils/createLog'

export function createApiHandler<R>(tag: ApiTag, handler: () => Promise<ApiResponse<R>>) {
  return async () => {
    const log = createLog({ tag })

    try {
      return await (handler as ApiHandlerNoPayload<R>)()
    } catch (error) {
      log.error((error as Error).message)
      return { data: null, error: (error as Error).message }
    }
  }
}

export function createApiHandlerWithPayload<R, P = void>(
  tag: ApiTag,
  handler: (payload: P) => Promise<ApiResponse<R>>
) {
  return async (payload: P) => {
    const log = createLog({ tag })

    try {
      if (!payload) {
        const error = `Called ${tag} api without payload`
        log.error(error)
        return { data: null, error }
      }

      return await handler(payload)
    } catch (error) {
      log.error((error as Error).message)
      return { data: null, error: (error as Error).message }
    }
  }
}
