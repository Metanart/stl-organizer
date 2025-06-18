import { SourceModel } from './SourceModel.types'

export type Source = {
  id: number
  name: string
  path: string
  isEnabled: boolean
  comment: string | null
  models: SourceModel[]
}

export type SourceCreate = Omit<Source, 'id' | 'models'>

export type SourceRemove = { id: number }

export type SourcesList = Record<number, Source>

export type SourcesState = SourcesList

export type SourcesContextType = {
  sources: SourcesState | null
  isLoading: boolean
  error?: string | null
  update: (source: Source) => Promise<void>
  create: (payload: SourceCreate) => Promise<void>
  remove: (payload: SourceRemove) => Promise<void>
}
