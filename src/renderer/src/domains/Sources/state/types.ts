import { SourceCreateDTO, SourceInputDTO } from '@shared/domains/Sources/types'

export type SourceItem = SourceInputDTO
export type SourceItemNew = Omit<SourceItem, 'id'>

export type SourcesState = Record<number, SourceItem>

export type SourcesContextType = {
  sources: SourcesState | null
  isLoading: boolean
  error?: string | null
  update: (payload: SourceInputDTO) => Promise<void>
  create: (payload: SourceCreateDTO) => Promise<void>
  remove: (payload: { id: number }) => Promise<void>
}
