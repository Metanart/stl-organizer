import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiQuery } from '@renderer/utils/api/baseApiQuery'

export type SourcesApiTags = 'Sources'

export const SourcesApi = createApi({
  reducerPath: 'SourcesApi',
  baseQuery: baseApiQuery,
  tagTypes: ['Sources'],
  endpoints: () => ({})
})
