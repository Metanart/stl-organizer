import { AutoMap } from '@automapper/classes'

import { SourceArchiveDTO } from './SourceArchiveDTO'
import { SourceImageDTO } from './SourceImageDTO'

export class SourceModelDTO {
  @AutoMap()
  id!: string

  @AutoMap()
  name!: string

  @AutoMap()
  path!: string

  @AutoMap()
  extension!: string

  @AutoMap()
  comment!: string

  @AutoMap()
  createdAt!: Date

  @AutoMap(() => SourceArchiveDTO)
  archive!: SourceArchiveDTO

  @AutoMap(() => [SourceImageDTO])
  images!: SourceImageDTO[]
}

export class SourceModelCreateDTO {
  @AutoMap()
  name!: string

  @AutoMap()
  path!: string

  @AutoMap()
  extension!: string

  @AutoMap()
  comment!: string

  @AutoMap()
  createdAt!: Date

  @AutoMap(() => SourceArchiveDTO)
  archive!: SourceArchiveDTO

  @AutoMap(() => [SourceImageDTO])
  images!: SourceImageDTO[]
}
