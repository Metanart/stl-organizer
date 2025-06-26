import { AutoMap } from '@automapper/classes'

import { SourceModelDTO } from './SourceModelDTO'

export class SourceDTO {
  @AutoMap()
  id!: string

  @AutoMap()
  path!: string

  @AutoMap()
  name!: string

  @AutoMap()
  comment!: string | null

  @AutoMap(() => [SourceModelDTO])
  models!: SourceModelDTO[]

  @AutoMap()
  isEnabled!: boolean
}

export class SourceCreateDTO {
  @AutoMap()
  path!: string

  @AutoMap()
  name!: string

  @AutoMap()
  comment?: string

  @AutoMap()
  isEnabled?: boolean
}

export class SourceUpdateDTO {
  @AutoMap()
  id!: string

  @AutoMap()
  path?: string

  @AutoMap()
  name?: string

  @AutoMap()
  comment?: string

  @AutoMap()
  isEnabled?: boolean
}

export class SourceFormDTO {
  @AutoMap()
  id!: string

  @AutoMap()
  path!: string

  @AutoMap()
  name!: string

  @AutoMap()
  comment?: string

  @AutoMap()
  isEnabled?: boolean
}

export class SourceCreateFormDTO {
  @AutoMap()
  path!: string

  @AutoMap()
  name?: string

  @AutoMap()
  comment?: string

  @AutoMap()
  isEnabled?: boolean
}

export class SourceUpdateFormDTO {
  @AutoMap()
  id!: string

  @AutoMap()
  path?: string

  @AutoMap()
  name?: string

  @AutoMap()
  comment?: string

  @AutoMap()
  isEnabled?: boolean
}
