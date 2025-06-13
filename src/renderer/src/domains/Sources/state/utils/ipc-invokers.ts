import { createIpcInvoker } from '@renderer/utils/createIpcInvoker'

import { SourcesDTO } from '@shared/domains/Sources/types'

import { SourcesItem } from '../types'

export const invokeSourcesGetAll = createIpcInvoker<SourcesDTO | null>(
  window.api.sources.getAll,
  'sources:getAll'
)

export const invokeSourcesUpdate = createIpcInvoker<SourcesDTO, SourcesItem>(
  window.api.sources.update,
  'sources:update'
)

export const invokeSourcesCreate = createIpcInvoker<SourcesDTO, SourcesItem>(
  window.api.sources.create,
  'sources:create'
)
