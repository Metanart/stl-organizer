export type SourceModel = {
  id: string
  name: string
  path: string
  archive: SourceArchive
  images: SourceImage[]
}

export type SourceImage = {
  id: string
  path: string
}

export type SourceArchive = {
  path: string
}
