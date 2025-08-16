import { LL } from '@i18n/utils/i18n-LL.async'
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
      throw { error }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: ApiResponse<any> = await api[method](payload)

    if ('error' in response) {
      log.error(response.error)
      throw new Error(response.error)
    }

    if (!response.data) {
      log.error(LL.app.dbErrors.responseIsEmpty())
      throw new Error(LL.app.dbErrors.responseIsEmpty())
    }

    return response

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    log.error(error)
    const message = error?.message || LL.app.dbErrors.unknown()
    return { error: message }
  }
}
