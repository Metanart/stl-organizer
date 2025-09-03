import { RemoveDTO } from '@shared/domains/Common/Common.dtos'
import { ApiDomain, ApiMethod } from '@shared/domains/Common/types/Api.types'
import { createLog } from '@shared/utils/logs/createLog'

import { SourcesApi, SourcesApiTags } from './SourcesApi'

type QueryReturn = {
  domain: ApiDomain
  method: ApiMethod
  payload: RemoveDTO
}

function query(removeDto: RemoveDTO): QueryReturn {
  const log = createLog({ tag: 'Sources.remove', category: 'RENDERER' })

  log.info('Taking remove dto', removeDto)

  return {
    domain: 'Sources',
    method: 'remove',
    payload: removeDto
  }
}

function transformResponse(result: boolean): boolean {
  const log = createLog({ tag: 'Sources.remove', category: 'RENDERER' })

  log.success('Removal result', result)

  return result
}

function invalidatesTags(result, error): SourcesApiTags[] {
  if (error || !result) return []

  return ['Sources']
}

export const { useRemoveSourceMutation } = SourcesApi.injectEndpoints({
  endpoints: (builder) => ({
    removeSource: builder.mutation<boolean, RemoveDTO>({
      query,
      transformResponse,
      invalidatesTags
    })
  }),
  overrideExisting: false
})
