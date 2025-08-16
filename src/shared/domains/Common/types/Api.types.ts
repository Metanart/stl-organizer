import { DBError } from '@main/utils/mapDBError'

import { Action, Domain } from './Common.types'

export type ApiDomain = Domain

export type ApiMethod = Action

export type ApiTag = `${ApiDomain}.${ApiMethod}` | `${ApiDomain}Api`

export type ApiResponse<R> = { data: R } | { error: string } | DBError

export type ApiHandlerNoPayload<R> = () => Promise<ApiResponse<R>>

export type ApiHandlerWithPayload<R, P> = (payload: P) => Promise<ApiResponse<R>>

export type ApiHandler<R, P = void> = P extends void
  ? ApiHandlerNoPayload<R>
  : ApiHandlerWithPayload<R, P>

export type ApiHandlerWrapped<R> = () => Promise<ApiResponse<R>>
