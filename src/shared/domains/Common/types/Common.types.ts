export type Domain = 'Config' | 'Sources' | 'Tasks'

export type ProjectArea = 'MAIN' | 'RENDERER' | 'SHARED' | 'PRELOAD'

export type Action = 'get' | 'getAll' | 'getFirst' | 'create' | 'update' | 'remove'

export type HandlerNoPayload<R> = () => R

export type HandlerWithPayload<R, P> = (payload: P) => R

export type Handler<R, P = void> = P extends void ? HandlerNoPayload<R> : HandlerWithPayload<R, P>
