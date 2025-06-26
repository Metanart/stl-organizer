import { AutoMap } from '@automapper/classes'

export class ConfigDTO {
  @AutoMap()
  id!: string

  @AutoMap()
  outputFolder!: string

  @AutoMap()
  tempFolder!: string

  @AutoMap()
  maxThreads!: number

  @AutoMap()
  autoProcessOnScan!: boolean

  @AutoMap()
  autoArchiveOnComplete!: boolean

  @AutoMap()
  useMultithreading!: boolean

  @AutoMap()
  debugMode!: boolean
}

export class ConfigFormDTO extends ConfigDTO {}

export class ConfigCreateDTO {
  @AutoMap()
  outputFolder?: string

  @AutoMap()
  tempFolder?: string

  @AutoMap()
  maxThreads?: number

  @AutoMap()
  autoProcessOnScan?: boolean

  @AutoMap()
  autoArchiveOnComplete?: boolean

  @AutoMap()
  useMultithreading?: boolean

  @AutoMap()
  debugMode?: boolean
}

export class ConfigUpdateDTO {
  @AutoMap()
  id!: string

  @AutoMap()
  outputFolder?: string

  @AutoMap()
  tempFolder?: string

  @AutoMap()
  maxThreads?: number

  @AutoMap()
  autoProcessOnScan?: boolean

  @AutoMap()
  autoArchiveOnComplete?: boolean

  @AutoMap()
  useMultithreading?: boolean

  @AutoMap()
  debugMode?: boolean
}

export class ConfigUpdateFormDTO extends ConfigUpdateDTO {}
