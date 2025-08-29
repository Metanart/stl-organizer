import { ApiDomain, ApiMethod } from '@shared/domains/Common/types/Api.types'
import { CONFIG_DTO_KEYS, ConfigDTO, ConfigFormDTO } from '@shared/domains/Config/Config.dtos'
import { createLog } from '@shared/utils/createLog'

import { ConfigMapper } from '../mappers/ConfigMapper'

import { ConfigApi, ConfigApiTags } from './ConfigApi'

type QueryReturn = {
  domain: ApiDomain
  method: ApiMethod
}

function query(): QueryReturn {
  return {
    domain: 'Config',
    method: 'get'
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

const providesTags: ConfigApiTags[] = ['Config']

export const { useGetConfigQuery } = ConfigApi.injectEndpoints({
  endpoints: (builder) => ({
    getConfig: builder.query<ConfigFormDTO, void>({ query, transformResponse, providesTags })
  })
})
