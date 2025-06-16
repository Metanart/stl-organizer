export type SourceDTO = {
  id: number
  path: string
  isEnabled: boolean
  comment: string | null
}

export type SourceInputDTO = {
  id: number
  path: string
  isEnabled: boolean
  comment?: string | null
}

export type SourceCreateDTO = {
  path: string
  isEnabled: boolean
  comment?: string | null
}

export type SourceRemoveDTO = { id: number }
