import { createIpcInvoker } from '@renderer/utils/createIpcInvoker'

import { SourceDTO, SourcesDTO } from '@shared/domains/Sources/types'

import { SourceItem } from '../types'

export const invokeSourcesGetAll = createIpcInvoker<SourcesDTO | null>(
  window.api.sources.getAll,
  'sources:getAll'
)

export const invokeSourcesUpdate = createIpcInvoker<SourceDTO, SourceItem>(
  window.api.sources.update,
  'sources:update'
)

export const invokeSourcesCreate = createIpcInvoker<SourceDTO, SourceItem>(
  window.api.sources.create,
  'sources:create'
)
