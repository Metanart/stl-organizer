// src/features/config/api/configApi.ts
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiQuery } from '@renderer/utils/baseApiQuery'

import { ApiDomain, ApiMethod } from '@shared/domains/Common/types/Api.types'
import {
  SOURCE_DTO_KEYS,
  SourceCreateDTO,
  SourceCreateFormDTO,
  SourceDTO,
  SourceFormDTO
} from '@shared/domains/Sources/Sources.dtos'
import { createLog } from '@shared/utils/createLog'

import { SourcesMapper } from '../mappers/SourcesMapper'

const reducerPath = 'SourcesApi'

const SourcesApiTags = {
  Base: 'Sources'
} as const

const SourcesApiMethods: Record<string, ApiMethod> = {
  GET_ALL: 'getAll',
  CREATE: 'create'
} as const

const SourcesApiDomain = 'Sources' as ApiDomain

export const SourcesApi = createApi({
  reducerPath,
  baseQuery: baseApiQuery,
  tagTypes: ['Sources'],
  endpoints: (builder) => ({
    getAllSources: builder.query<SourceFormDTO[], void>({
      query: () => ({
        domain: SourcesApiDomain,
        method: SourcesApiMethods.GET_ALL
      }),
      transformResponse: (sourceDtos: SourceDTO[]): SourceFormDTO[] => {
        const log = createLog({ tag: 'Sources.getAll', category: 'RENDERER' })

        log.info('Response - received raw source dtos', sourceDtos)

        const sourcesFormDtos = sourceDtos.map((sourceDto: SourceDTO) =>
          SourcesMapper.map<SourceDTO, SourceFormDTO>(
            sourceDto,
            SOURCE_DTO_KEYS.SourceDTO,
            SOURCE_DTO_KEYS.SourceFormDTO
          )
        )

        log.success('Response - returns mapped source form dtos', sourcesFormDtos)

        return sourcesFormDtos
      },
      providesTags: [SourcesApiTags.Base]
    }),
    createSource: builder.mutation<SourceFormDTO, SourceCreateFormDTO>({
      query: (sourceCreateFormDto: SourceCreateFormDTO) => {
        const log = createLog({ tag: 'Sources.create', category: 'RENDERER' })

        log.info('Query - received raw source form dto', sourceCreateFormDto)

        const sourceCreateDto = SourcesMapper.map<SourceCreateFormDTO, SourceCreateDTO>(
          sourceCreateFormDto,
          SOURCE_DTO_KEYS.SourceCreateFormDTO,
          SOURCE_DTO_KEYS.SourceCreateDTO
        )

        log.success('Query - returns mapped source dto', sourceCreateDto)

        return {
          domain: SourcesApiDomain,
          method: SourcesApiMethods.CREATE,
          payload: sourceCreateDto
        }
      },
      transformResponse: (sourceDto: SourceDTO): SourceFormDTO => {
        const log = createLog({ tag: 'Sources.create', category: 'RENDERER' })

        log.info('Response - received raw source dto', sourceDto)

        const sourceFormDto = SourcesMapper.map<SourceDTO, SourceFormDTO>(
          sourceDto,
          SOURCE_DTO_KEYS.SourceDTO,
          SOURCE_DTO_KEYS.SourceFormDTO
        )

        log.success('Response - returns mapped source form dto', sourceFormDto)

        return sourceFormDto
      },
      invalidatesTags: [SourcesApiTags.Base]
    })
  })
})

export const { useGetAllSourcesQuery, useCreateSourceMutation } = SourcesApi
