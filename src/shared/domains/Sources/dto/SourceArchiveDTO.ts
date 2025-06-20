import { AutoMap } from '@automapper/classes'

export class SourceArchiveDTO {
  @AutoMap()
  id!: string

  @AutoMap()
  name!: string

  @AutoMap()
  path!: string

  @AutoMap()
  sizeBytes!: number

  @AutoMap()
  hash!: string

  @AutoMap()
  extension!: string

  @AutoMap()
  isDeleted!: boolean
}
