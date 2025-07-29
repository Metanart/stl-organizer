// src/features/config/api/configApi.ts
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiQuery } from '@renderer/utils/baseApiQuery'

import { ApiDomain, ApiMethod } from '@shared/domains/Common/types/Api.types'
import { SOURCE_DTO_KEYS, SourceDTO, SourceFormDTO } from '@shared/domains/Sources/Sources.dtos'
import { SourceUpdateDTO, SourceUpdateFormDTO } from '@shared/domains/Sources/Sources.dtos'
import { createLog } from '@shared/utils/createLog'

import { SourcesMapper } from '../mappers/SourcesMapper'

const reducerPath = 'SourcesApi'

const SourcesApiTags = {
  Base: 'Sources'
} as const

const SourcesApiMethods: Record<string, ApiMethod> = {
  GET: 'get',
  UPDATE: 'update'
} as const

const SourcesApiDomain = 'Sources' as ApiDomain

const log = createLog({ tag: 'SourcesApi', category: 'RENDERER' })

export const SourcesApi = createApi({
  reducerPath,
  baseQuery: baseApiQuery,
  tagTypes: ['Sources'],
  endpoints: (builder) => ({
    getSources: builder.query<SourceFormDTO, void>({
      query: () => ({
        domain: SourcesApiDomain,
        method: SourcesApiMethods.GET
      }),
      transformResponse: (configDto: SourceDTO): SourceFormDTO => {
        log.info('Received raw config', configDto)

        const configFormDto = SourcesMapper.map<SourceDTO, SourceFormDTO>(
          configDto,
          SOURCE_DTO_KEYS.SourceDTO,
          SOURCE_DTO_KEYS.SourceFormDTO
        )

        log.success('Returning mapped config form', configFormDto)

        return configFormDto
      },
      providesTags: [SourcesApiTags.Base]
    }),
    updateSource: builder.mutation<SourceFormDTO, SourceUpdateFormDTO>({
      query: (configUpdateFormDTO: SourceUpdateFormDTO) => {
        const configUpdateDTO = SourcesMapper.map<SourceUpdateFormDTO, SourceUpdateDTO>(
          configUpdateFormDTO,
          SOURCE_DTO_KEYS.SourceUpdateFormDTO,
          SOURCE_DTO_KEYS.SourceUpdateDTO
        )

        return {
          domain: SourcesApiDomain,
          method: SourcesApiMethods.UPDATE,
          payload: configUpdateDTO
        }
      },
      transformResponse: (confgiDTO: SourceDTO): SourceFormDTO => {
        return SourcesMapper.map<SourceDTO, SourceFormDTO>(
          confgiDTO,
          SOURCE_DTO_KEYS.SourceDTO,
          SOURCE_DTO_KEYS.SourceFormDTO
        )
      },
      invalidatesTags: [SourcesApiTags.Base]
    })
  })
})

export const { useGetSourcesQuery, useUpdateSourceMutation } = SourcesApi
