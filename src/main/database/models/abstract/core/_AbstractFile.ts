import { Column, Index } from 'typeorm'

import { _AbstractEntity } from './_AbstractEntity'

export abstract class _AbstractFile extends _AbstractEntity {
  abstract extension: string

  @Column({ type: 'varchar' })
  name!: string

  @Column({ type: 'varchar' })
  path!: string

  @Column({ type: 'int' })
  sizeBytes!: number

  @Column({ type: 'varchar', unique: true })
  @Index()
  hash!: string

  @Column({ type: 'boolean', default: false })
  isDeleted!: boolean
}
