import { AutoMap } from '@automapper/classes'
import { Column, Entity } from 'typeorm'

import { AppPaths } from '@shared/paths'

import { _AbstractEntity } from '../../Common/entities/abstract/core/_AbstractEntity'

const { defaultOutputFolder, defaultTempFolder } = AppPaths

@Entity()
export class Config extends _AbstractEntity {
  @Column({ type: 'varchar', default: defaultOutputFolder })
  @AutoMap()
  outputFolder!: string

  @Column({ type: 'varchar', default: defaultTempFolder })
  @AutoMap()
  tempFolder!: string

  @Column({ type: 'int', default: 4 })
  @AutoMap()
  maxThreads!: number

  @Column({ type: 'boolean', default: false })
  @AutoMap()
  autoProcessOnScan!: boolean

  @Column({ type: 'boolean', default: false })
  @AutoMap()
  autoArchiveOnComplete!: boolean

  @Column({ type: 'boolean', default: true })
  @AutoMap()
  useMultithreading!: boolean

  @Column({ type: 'boolean', default: false })
  @AutoMap()
  debugMode!: boolean
}
