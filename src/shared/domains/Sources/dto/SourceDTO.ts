import { SourceModelDTO } from './SourceModelDTO'

export class SourceDTO {
  id!: string

  path!: string

  name!: string

  comment!: string | null

  models!: SourceModelDTO[]

  isEnabled!: boolean
}

export class SourceCreateDTO {
  path!: string

  name!: string

  comment?: string

  isEnabled?: boolean
}

export class SourceUpdateDTO {
  id!: string

  path?: string

  name?: string

  comment?: string

  isEnabled?: boolean
}

export class SourceFormDTO {
  id!: string

  path!: string

  name!: string

  comment?: string

  isEnabled?: boolean
}

export class SourceCreateFormDTO {
  path!: string

  name?: string

  comment?: string

  isEnabled?: boolean
}

export class SourceUpdateFormDTO {
  id!: string

  path?: string

  name?: string

  comment?: string

  isEnabled?: boolean
}
