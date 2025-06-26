import { Column, Entity } from 'typeorm'

import { AppPaths } from '@shared/paths'

import { _AbstractEntity } from '../../Common/entities/abstract/core/_AbstractEntity'

const { defaultOutputFolder, defaultTempFolder } = AppPaths

@Entity()
export class Config extends _AbstractEntity {
  @Column({ type: 'varchar', default: defaultOutputFolder })
  outputFolder!: string

  @Column({ type: 'varchar', default: defaultTempFolder })
  tempFolder!: string

  @Column({ type: 'int', default: 4 })
  maxThreads!: number

  @Column({ type: 'boolean', default: false })
  autoProcessOnScan!: boolean

  @Column({ type: 'boolean', default: false })
  autoArchiveOnComplete!: boolean

  @Column({ type: 'boolean', default: true })
  useMultithreading!: boolean

  @Column({ type: 'boolean', default: false })
  debugMode!: boolean
}
