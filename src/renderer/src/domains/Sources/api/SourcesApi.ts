import { createApiHandler, createApiHandlerWithPayload } from '@renderer/utils/createApiHandler'

import { RemoveDTO } from '@shared/domains/Common/dto/RemoveDTO'
import {
  SourceCreateFormDTO,
  SourceDTO,
  SourceUpdateFormDTO
} from '@shared/domains/Sources/dto/SourceDTO'

export class SourcesApi {
  static getAll = createApiHandler<SourceDTO[] | null>(
    'SourcesApi.getAll',
    window.api.sources.getAll
  )

  static create = createApiHandlerWithPayload<SourceDTO | null, SourceCreateFormDTO>(
    'SourcesApi.create',
    window.api.sources.create
  )

  static update = createApiHandlerWithPayload<SourceDTO | null, SourceUpdateFormDTO>(
    'SourcesApi.update',
    window.api.sources.update
  )

  static remove = createApiHandlerWithPayload<boolean | null, RemoveDTO>(
    'SourcesApi.remove',
    window.api.sources.remove
  )
}
