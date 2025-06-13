export type SourceDTO = {
  id: number
  path: string
  isEnabled: boolean
  comment: string | null
}

export type SourceInputDTO = Pick<SourceDTO, 'id' | 'path' | 'isEnabled' | 'comment'>

export type SourcesDTO = SourceDTO[]

export type SourcesInputDTO = SourceInputDTO[]
