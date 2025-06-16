import { createIpcInvoker } from '@renderer/utils/createIpcInvoker'

import {
  SourceCreateDTO,
  SourceDTO,
  SourceInputDTO,
  SourcesDTO
} from '@shared/domains/Sources/types'

export const invokeSourcesGetAll = createIpcInvoker<SourcesDTO | null>(
  window.api.sources.getAll,
  'sources:getAll'
)

export const invokeSourcesUpdate = createIpcInvoker<SourceDTO, SourceInputDTO>(
  window.api.sources.update,
  'sources:update'
)

export const invokeSourcesCreate = createIpcInvoker<SourceDTO, SourceCreateDTO>(
  window.api.sources.create,
  'sources:create'
)

export const invokeSourcesRemove = createIpcInvoker<{ id: number } | null, { id: number }>(
  window.api.sources.remove,
  'sources:remove'
)
