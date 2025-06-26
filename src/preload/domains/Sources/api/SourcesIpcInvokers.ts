import { createIpcInvoker, createIpcInvokerWithPayload } from '@preload/utils/createIpcInvoker'

import { RemoveDTO } from '@shared/domains/Common/dtos/DTOs'
import {
  SourceCreateFormDTO,
  SourceDTO,
  SourceUpdateFormDTO
} from '@shared/domains/Sources/dtos/SourceDTO'

export const sourcesIpcInvokers = {
  getAll: createIpcInvoker<SourceDTO[] | null>('SourcesIpc.getAll'),
  update: createIpcInvokerWithPayload<SourceDTO, SourceUpdateFormDTO>('SourcesIpc.update'),
  create: createIpcInvokerWithPayload<SourceDTO, SourceCreateFormDTO>('SourcesIpc.create'),
  remove: createIpcInvokerWithPayload<boolean, RemoveDTO>('SourcesIpc.remove')
} as const

export type SourcesIpcInvokers = typeof sourcesIpcInvokers
