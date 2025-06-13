import { Source } from '@shared/domains/Sources/types'

export type SourcesContextType = {
  sources: SourcesState | null
}

export type SourcesState = Source[]
