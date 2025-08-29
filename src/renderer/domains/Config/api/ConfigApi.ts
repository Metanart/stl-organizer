import { createApi } from '@reduxjs/toolkit/query/react'
import { baseApiQuery } from '@renderer/utils/baseApiQuery'

const reducerPath = 'ConfigApi'

export type ConfigApiTags = 'Config'

export const ConfigApi = createApi({
  reducerPath,
  baseQuery: baseApiQuery,
  tagTypes: ['Config'],
  endpoints: () => ({})
})
