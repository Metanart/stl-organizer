export type IpcResponse<T> = { data: T; error: null } | { data: null; error: string }

export type IpcTagEntity = 'config' | 'sources' | 'tasks'

export type IpcTagAction = 'get' | 'getAll' | 'getFirst' | 'create' | 'update' | 'remove'

export type IpcCustomTag = 'dialog:select-folder'

export type IpcTag = `${IpcTagEntity}:${IpcTagAction}` | IpcCustomTag

export type IpcInvokerNoPayload<ResponseType> = () => Promise<IpcResponse<ResponseType>>

export type IpcInvokerWithPayload<ResponseType, PayloadType> = (
  payload: PayloadType
) => Promise<IpcResponse<ResponseType>>

export type IpcInvoker<ResponseType, PayloadType = void> = PayloadType extends void
  ? IpcInvokerNoPayload<ResponseType>
  : IpcInvokerWithPayload<ResponseType, PayloadType>
