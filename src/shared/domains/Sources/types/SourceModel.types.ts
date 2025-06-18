export type SourceImageDTO = {
  id: number
  path: string
}

export type SourceArchiveDTO = {
  path: string
}

export type SourceModelDTO = {
  id: number
  name: string
  path: string
  archive: SourceArchiveDTO
  images: SourceImageDTO[]
}

export type SourceModelInputDTO = {
  id: number
  path: string
  archive: SourceArchiveDTO
  images: SourceImageDTO[]
}

export type SourceModelRemoveDTO = { id: number }
