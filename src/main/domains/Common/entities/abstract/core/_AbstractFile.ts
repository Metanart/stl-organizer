import { AutoMap } from '@automapper/classes'
import { Column, Index } from 'typeorm'

import { _AbstractEntity } from './_AbstractEntity'

export abstract class _AbstractFile extends _AbstractEntity {
  abstract extension: string

  @Column({ type: 'varchar' })
  @AutoMap()
  name!: string

  @Column({ type: 'varchar' })
  @AutoMap()
  path!: string

  @Column({ type: 'int' })
  @AutoMap()
  sizeBytes!: number

  @Column({ type: 'varchar', unique: true })
  @AutoMap()
  @Index()
  hash!: string

  @Column({ type: 'boolean', default: false })
  @AutoMap()
  isDeleted!: boolean
}
