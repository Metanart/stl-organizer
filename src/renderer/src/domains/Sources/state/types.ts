import { SourceCreateDTO, SourceInputDTO, SourceRemoveDTO } from '@shared/domains/Sources/types'

export type Source = SourceInputDTO

export type SourceNew = SourceCreateDTO

export type SourceRemove = { id: number }

export type SourcesList = Record<number, Source>

export type SourcesState = SourcesList

export type SourcesContextType = {
  sources: SourcesState | null
  isLoading: boolean
  error?: string | null
  update: (payload: SourceInputDTO) => Promise<void>
  create: (payload: SourceCreateDTO) => Promise<void>
  remove: (payload: SourceRemoveDTO) => Promise<void>
}
