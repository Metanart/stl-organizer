import { RemoveDTO } from '@shared/domains/Common/dtos/DTOs'
import { SourceCreateFormDTO, SourceUpdateFormDTO } from '@shared/domains/Sources/dtos/SourceDTO'

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
