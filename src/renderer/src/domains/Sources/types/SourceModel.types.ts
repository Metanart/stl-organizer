export type SourceModel = {
  id: number
  name: string
  path: string
  archive: SourceArchive
  images: SourceImage[]
}

export type SourceImage = {
  id: number
  path: string
}

export type SourceArchive = {
  path: string
}
