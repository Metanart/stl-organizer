import { Column, Entity } from 'typeorm'

import type { SourceFolderType } from '@shared/types/common'

import { _AbstractEntity } from '../abstract/core/_AbstractEntity'

@Entity()
export class SourceFolder extends _AbstractEntity {
  @Column({ type: 'varchar', unique: true })
  path!: string

  @Column({ type: 'boolean', default: true })
  isEnabled!: boolean

  @Column({ type: 'datetime', nullable: true })
  lastScannedAt?: Date

  @Column({ type: 'varchar', nullable: true })
  comment?: string

  @Column({ type: 'varchar', default: 'manual' })
  sourceType!: SourceFolderType
}
