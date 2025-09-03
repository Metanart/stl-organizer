import { ApiDomain, ApiMethod } from '@shared/domains/Common/types/Api.types'
import { SourceDTO, SourceFormDTO, SOURCES_DTO_KEYS } from '@shared/domains/Sources/Sources.dtos'
import { createLog } from '@shared/utils/logs/createLog'

import { SourcesMapper } from '../mappers/SourcesMapper'

import { SourcesApi, SourcesApiTags } from './SourcesApi'

type QueryReturn = {
  domain: ApiDomain
  method: ApiMethod
}

function query(): QueryReturn {
  return {
    domain: 'Sources',
    method: 'getAll'
  }
}

function transformResponse(sourceDtos: SourceDTO[]): SourceFormDTO[] {
  const log = createLog({ tag: 'Sources.getAll', category: 'RENDERER' })

  log.info('Getting raw source dtos', sourceDtos)

  const sourcesFormDtos = sourceDtos.map((sourceDto: SourceDTO) =>
    SourcesMapper.map<SourceDTO, SourceFormDTO>(
      sourceDto,
      SOURCES_DTO_KEYS.SourceDTO,
      SOURCES_DTO_KEYS.SourceFormDTO
    )
  )

  log.success('Returning mapped source form dtos', sourcesFormDtos)

  return sourcesFormDtos
}

const providesTags: SourcesApiTags[] = ['Sources']

export const { useGetAllSourcesQuery } = SourcesApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSources: builder.query<SourceFormDTO[], void>({
      query,
      transformResponse,
      providesTags
    })
  }),
  overrideExisting: false
})
