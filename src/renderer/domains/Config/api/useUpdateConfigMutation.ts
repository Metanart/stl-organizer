import { ApiDomain, ApiMethod } from '@shared/domains/Common/types/Api.types'
import {
  CONFIG_DTO_KEYS,
  ConfigDTO,
  ConfigFormDTO,
  ConfigUpdateDTO,
  ConfigUpdateFormDTO
} from '@shared/domains/Config/Config.dtos'
import { createLog } from '@shared/utils/createLog'

import { ConfigMapper } from '../mappers/ConfigMapper'

import { ConfigApi, ConfigApiTags } from './ConfigApi'

type QueryReturn = {
  domain: ApiDomain
  method: ApiMethod
  payload: ConfigUpdateDTO
}

function query(configUpdateFormDTO: ConfigUpdateFormDTO): QueryReturn {
  const log = createLog({ tag: 'Config.update', category: 'RENDERER' })

  log.info('Received raw config form', configUpdateFormDTO)

  const configUpdateDTO = ConfigMapper.map<ConfigUpdateFormDTO, ConfigUpdateDTO>(
    configUpdateFormDTO,
    CONFIG_DTO_KEYS.ConfigUpdateFormDTO,
    CONFIG_DTO_KEYS.ConfigUpdateDTO
  )

  log.success('Returning mapped config form', configUpdateDTO)

  return {
    domain: 'Config',
    method: 'update',
    payload: configUpdateDTO
  }
}

function transformResponse(configDto: ConfigDTO): ConfigFormDTO {
  const log = createLog({ tag: 'Config.get', category: 'RENDERER' })

  log.info('Received raw config', configDto)

  const configFormDto = ConfigMapper.map<ConfigDTO, ConfigFormDTO>(
    configDto,
    CONFIG_DTO_KEYS.ConfigDTO,
    CONFIG_DTO_KEYS.ConfigFormDTO
  )

  log.success('Returning mapped config form', configFormDto)

  return configFormDto
}

function invalidatesTags(result, error): ConfigApiTags[] {
  if (error || !result) return []

  return ['Config']
}

export const { useUpdateConfigMutation } = ConfigApi.injectEndpoints({
  endpoints: (builder) => ({
    updateConfig: builder.mutation<ConfigFormDTO, ConfigUpdateFormDTO>({
      query,
      transformResponse,
      invalidatesTags
    })
  })
})
