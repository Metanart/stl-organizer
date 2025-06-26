import { RemoveDTO } from '@shared/domains/Common/dto/RemoveDTO'
import { SourceCreateFormDTO, SourceUpdateFormDTO } from '@shared/domains/Sources/dto/SourceDTO'

export type SourceForm = {
  id: string
  path: string
  name: string
  comment?: string
  isEnabled?: boolean
}
export type SourcesState = Record<string, SourceForm>

export type SourcesContextType = {
  sources?: SourcesState
  isLoading: boolean
  error?: string
  update: (source: SourceUpdateFormDTO) => Promise<void>
  create: (payload: SourceCreateFormDTO) => Promise<void>
  remove: (payload: RemoveDTO) => Promise<void>
}
