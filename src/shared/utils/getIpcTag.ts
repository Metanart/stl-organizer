import { IPC_ACTION, IPC_ENTITY } from '@shared/enums/ipc'

export const getIpcTag = (entity: IPC_ENTITY, action: IPC_ACTION): `${IPC_ENTITY}:${IPC_ACTION}` =>
  `${entity}:${action}`
