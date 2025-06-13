import { SourceInputDTO } from '@shared/domains/Sources/types'

export type SourcesItem = SourceInputDTO

export type SourcesState = SourcesItem[]

export type SourcesContextType = {
  sources: SourcesState | null
  isLoading: boolean
  error?: string | null
  update: (payload: SourceInputDTO) => Promise<void>
  create: (payload: SourceInputDTO) => Promise<void>
}
