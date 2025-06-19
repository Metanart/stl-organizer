import { Column, Index } from 'typeorm'

import { _AbstractEntity } from './_AbstractEntity'

export type ProcessingStatus = 'awaiting' | 'processing' | 'processed' | 'skipped' | 'error'

export abstract class _AbstractProcessingFile extends _AbstractEntity {
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

  @Column({ type: 'varchar', default: 'awaiting' })
  status!: ProcessingStatus

  @Column({ type: 'boolean', default: false })
  isDeleted!: boolean
}
