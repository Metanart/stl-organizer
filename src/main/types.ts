import { IpcMainInvokeEvent } from 'electron/main'

import { IpcResponse } from '@shared/domains/Common/types/ipc.types'

export type IpcHandlerNoPayload<ResponseType> = (
  _event: IpcMainInvokeEvent
) => Promise<IpcResponse<ResponseType>>

export type IpcHandlerWithPayload<ResponseType, PayloadType> = (
  _event: IpcMainInvokeEvent,
  payload: PayloadType
) => Promise<IpcResponse<ResponseType>>

export type IpcHandler<ResponseType, PayloadType = void> = PayloadType extends void
  ? IpcHandlerNoPayload<ResponseType>
  : IpcHandlerWithPayload<ResponseType, PayloadType>

export type DBHandlerNoPayload<ResponseType> = () => Promise<ResponseType>

export type DBHandlerWithPayload<ResponseType, PayloadType> = (
  payload: PayloadType
) => Promise<ResponseType>

export type DBHandler<ResponseType, PayloadType = void> = PayloadType extends void
  ? DBHandlerNoPayload<ResponseType>
  : DBHandlerWithPayload<ResponseType, PayloadType>
