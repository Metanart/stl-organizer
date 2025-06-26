import { SourceArchiveDTO } from './SourceArchiveDTO'
import { SourceImageDTO } from './SourceImageDTO'

export class SourceModelDTO {
  id!: string

  name!: string

  path!: string

  extension!: string

  comment!: string

  createdAt!: Date

  archive!: SourceArchiveDTO

  images!: SourceImageDTO[]
}

export class SourceModelCreateDTO {
  name!: string

  path!: string

  extension!: string

  comment!: string

  createdAt!: Date

  archive!: SourceArchiveDTO

  images!: SourceImageDTO[]
}
