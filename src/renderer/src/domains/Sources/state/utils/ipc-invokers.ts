import { createIpcInvoker } from '@renderer/utils/createIpcInvoker'

import {
  SourceCreateDTO,
  SourceDTO,
  SourceInputDTO,
  SourceRemoveDTO
} from '@shared/domains/Sources/types'

export const invokeSourcesGetAll = createIpcInvoker<SourceDTO[] | null>(
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

export const invokeSourcesRemove = createIpcInvoker<SourceRemoveDTO | null, SourceRemoveDTO>(
  window.api.sources.remove,
  'sources:remove'
)
