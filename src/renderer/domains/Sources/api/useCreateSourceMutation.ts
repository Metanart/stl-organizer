import { ApiDomain, ApiMethod } from '@shared/domains/Common/types/Api.types'
import {
  SourceCreateDTO,
  SourceCreateFormDTO,
  SourceDTO,
  SourceFormDTO,
  SOURCES_DTO_KEYS
} from '@shared/domains/Sources/Sources.dtos'
import { createLog } from '@shared/utils/createLog'

import { SourcesMapper } from '../mappers/SourcesMapper'

import { SourcesApi } from './SourcesApi'
import { SourcesApiTags } from './types'

type QueryReturn = {
  domain: ApiDomain
  method: ApiMethod
  payload: SourceCreateDTO
}

function query(sourceCreateFormDto: SourceCreateFormDTO): QueryReturn {
  const log = createLog({ tag: 'Sources.create', category: 'RENDERER' })

  log.info('Taking raw source form dto', sourceCreateFormDto)

  const sourceCreateDto = SourcesMapper.map<SourceCreateFormDTO, SourceCreateDTO>(
    sourceCreateFormDto,
    SOURCES_DTO_KEYS.SourceCreateFormDTO,
    SOURCES_DTO_KEYS.SourceCreateDTO
  )

  log.success('Sending mapped source dto', sourceCreateDto)

  return {
    domain: 'Sources',
    method: 'create',
    payload: sourceCreateDto
  }
}

function transformResponse(sourceDto: SourceDTO): SourceFormDTO {
  const log = createLog({ tag: 'Sources.create', category: 'RENDERER' })

  log.info('Getting raw source dto', sourceDto)

  const sourceFormDto = SourcesMapper.map<SourceDTO, SourceFormDTO>(
    sourceDto,
    SOURCES_DTO_KEYS.SourceDTO,
    SOURCES_DTO_KEYS.SourceFormDTO
  )

  log.success('Returning mapped source form dto', sourceFormDto)

  return sourceFormDto
}

function invalidatesTags(result, error): SourcesApiTags[] {
  if (error || !result) return []

  return ['Sources']
}

export const { useCreateSourceMutation } = SourcesApi.injectEndpoints({
  endpoints: (builder) => ({
    createSource: builder.mutation<SourceFormDTO, SourceCreateFormDTO>({
      query,
      transformResponse,
      invalidatesTags
    })
  }),
  overrideExisting: false
})
