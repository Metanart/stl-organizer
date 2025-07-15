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
} from '@shared/domains/Config/dtos/ConfigDTO'

import { ConfigMapper } from '../mappers/ConfigMapper'

const ConfigApiTags = {
  Base: 'Config'
} as const

const ConfigApiMethods: Record<string, ApiMethod> = {
  GET: 'get',
  UPDATE: 'update'
} as const

const ConfigApiDomain = 'Config' as ApiDomain

export const ConfigApi = createApi({
  reducerPath: 'ConfigApi',
  baseQuery: baseApiQuery,
  tagTypes: ['Config'],
  endpoints: (builder) => ({
    getConfig: builder.query<ConfigFormDTO, void>({
      query: () => ({
        domain: ConfigApiDomain,
        method: ConfigApiMethods.GET
      }),
      transformResponse: (rawDTO: ConfigDTO): ConfigFormDTO => {
        return ConfigMapper.map<ConfigDTO, ConfigFormDTO>(
          rawDTO,
          CONFIG_DTO_KEYS.ConfigDTO,
          CONFIG_DTO_KEYS.ConfigFormDTO
        )
      },
      providesTags: [ConfigApiTags.Base]
    }),
    updateConfig: builder.mutation<ConfigFormDTO, ConfigUpdateFormDTO>({
      query: (configUpdateFormDTO: ConfigUpdateFormDTO) => {
        const configUpdateDTO = ConfigMapper.map<ConfigUpdateFormDTO, ConfigUpdateDTO>(
          configUpdateFormDTO,
          CONFIG_DTO_KEYS.ConfigUpdateFormDTO,
          CONFIG_DTO_KEYS.ConfigUpdateDTO
        )

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
