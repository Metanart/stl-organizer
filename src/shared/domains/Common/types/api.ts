import { Action, Domain } from './common'

export type ApiTag = `${Domain}Api.${Action}`

export type ApiResponse<R> = { data: R; error: null } | { data: null; error: string }

export type ApiHandlerNoPayload<R> = () => Promise<ApiResponse<R>>

export type ApiHandlerWithPayload<R, P> = (payload: P) => Promise<ApiResponse<R>>

export type ApiHandler<R, P = void> = P extends void
  ? ApiHandlerNoPayload<R>
  : ApiHandlerWithPayload<R, P>

export type ApiHandlerWrapped<R> = () => Promise<ApiResponse<R>>
