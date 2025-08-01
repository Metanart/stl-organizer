import { configureStore } from '@reduxjs/toolkit'
import { ConfigApi } from '@renderer/domains/Config/api/ConfigApi'
import { SourcesApi } from '@renderer/domains/Sources/api/SourcesApi'

export const AppStore = configureStore({
  reducer: {
    [ConfigApi.reducerPath]: ConfigApi.reducer,
    [SourcesApi.reducerPath]: SourcesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ConfigApi.middleware).concat(SourcesApi.middleware)
})
