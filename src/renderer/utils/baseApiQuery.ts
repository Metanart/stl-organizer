import { BaseQueryFn } from '@reduxjs/toolkit/query'

import { ApiDomain, ApiMethod, ApiResponse, ApiTag } from '@shared/domains/Common/types/Api.types'
import { createLog } from '@shared/utils/createLog'

export const baseApiQuery: BaseQueryFn<
  { domain: ApiDomain; method: ApiMethod; payload?: unknown },
  unknown,
  string
> = async ({ domain, method, payload }) => {
  const tag: ApiTag = `${domain}.${method}`
  const log = createLog({ tag, category: 'RENDERER' })

  try {
    const api = window.api[domain.toLowerCase().trim()]

    if (!api || typeof api[method] !== 'function') {
      const error = `API method ${tag} not found`
      log.error(error)
      return { error }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: ApiResponse<any> = await api[method](payload)

    if ('error' in response) {
      log.error(response.error)
      return { error: response.error }
    }

    if (!response.data) {
      const error = 'Empty response'
      log.error(error)
      return { error }
    }

    return { data: response.data }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = error?.message || 'Unknown error'
    log.error(message)
    return { error: message }
  }
}
