import { SourceModelDTO, SourceModelInputDTO } from './SourceModel.types'

export type SourceDTO = {
  id: number
  name: string
  path: string
  isEnabled: boolean
  comment: string | null
  models: SourceModelDTO[]
}

export type SourceInputDTO = {
  id: number
  name: string
  path: string
  isEnabled: boolean
  comment?: string | null
  models: SourceModelInputDTO[]
}

export type SourceCreateDTO = {
  name: string
  path: string
  isEnabled: boolean
  comment?: string | null
}

export type SourceRemoveDTO = { id: number }
