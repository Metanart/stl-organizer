// src/features/config/api/configApi.ts
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiQuery } from '@renderer/utils/baseApiQuery'

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

const reducerPath = 'ConfigApi'

const ConfigApiTags = {
  Base: 'Config'
} as const

const ConfigApiMethods: Record<string, ApiMethod> = {
  GET: 'get',
  UPDATE: 'update'
} as const

const ConfigApiDomain = 'Config' as ApiDomain

export const ConfigApi = createApi({
  reducerPath,
  baseQuery: baseApiQuery,
  tagTypes: ['Config'],
  endpoints: (builder) => ({
    getConfig: builder.query<ConfigFormDTO, void>({
      query: () => ({
        domain: ConfigApiDomain,
        method: ConfigApiMethods.GET
      }),
      transformResponse: (configDto: ConfigDTO): ConfigFormDTO => {
        const log = createLog({ tag: 'Config.get', category: 'RENDERER' })

        log.info('Received raw config', configDto)

        const configFormDto = ConfigMapper.map<ConfigDTO, ConfigFormDTO>(
          configDto,
          CONFIG_DTO_KEYS.ConfigDTO,
          CONFIG_DTO_KEYS.ConfigFormDTO
        )

        log.success('Returning mapped config form', configFormDto)

        return configFormDto
      },
      providesTags: [ConfigApiTags.Base]
    }),
    updateConfig: builder.mutation<ConfigFormDTO, ConfigUpdateFormDTO>({
      query: (configUpdateFormDTO: ConfigUpdateFormDTO) => {
        const log = createLog({ tag: 'Config.update', category: 'RENDERER' })

        log.info('Received raw config', configUpdateFormDTO)

        const configUpdateDTO = ConfigMapper.map<ConfigUpdateFormDTO, ConfigUpdateDTO>(
          configUpdateFormDTO,
          CONFIG_DTO_KEYS.ConfigUpdateFormDTO,
          CONFIG_DTO_KEYS.ConfigUpdateDTO
        )

        log.success('Returning mapped config form', configUpdateDTO)

        return {
          domain: ConfigApiDomain,
          method: ConfigApiMethods.UPDATE,
          payload: configUpdateDTO
        }
      },
      transformResponse: (confgiDTO: ConfigDTO): ConfigFormDTO => {
        return ConfigMapper.map<ConfigDTO, ConfigFormDTO>(
          confgiDTO,
          CONFIG_DTO_KEYS.ConfigDTO,
          CONFIG_DTO_KEYS.ConfigFormDTO
        )
      },
      invalidatesTags: [ConfigApiTags.Base]
    })
  })
})

export const { useGetConfigQuery, useUpdateConfigMutation } = ConfigApi
