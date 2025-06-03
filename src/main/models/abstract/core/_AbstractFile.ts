import { Column, Index } from 'typeorm'

import { _AbstractEntity } from './_AbstractEntity'

export abstract class _AbstractFile extends _AbstractEntity {
  abstract extension: string

  @Column()
  name!: string

  @Column()
  path!: string

  @Column()
  sizeBytes!: number

  @Column({ unique: true })
  @Index()
  hash!: string

  @Column({ default: false })
  isDeleted!: boolean
}
