import { configureStore } from '@reduxjs/toolkit'
import { ConfigApi } from '@renderer/domains/Config/api/ConfigApi'

export const AppStore = configureStore({
  reducer: {
    [ConfigApi.reducerPath]: ConfigApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ConfigApi.middleware)
})
