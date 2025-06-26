import { createApiHandler, createApiHandlerWithPayload } from '@renderer/utils/createApiHandler'

import { ConfigDTO, ConfigUpdateFormDTO } from '@shared/domains/Config/dtos/ConfigDTO'

export class ConfigApi {
  static get = createApiHandler<ConfigDTO | null>('ConfigApi.get', window.api.config.get)

  static update = createApiHandlerWithPayload<ConfigDTO | null, ConfigUpdateFormDTO>(
    'ConfigApi.update',
    window.api.config.update
  )
}
