import { Column, Entity, ManyToOne } from 'typeorm'

import type { SourceFolderType } from '@shared/types/common'

import { _AbstractEntity } from '../abstract/core/_AbstractEntity'

import { Config } from './Config'

@Entity()
export class SourceFolder extends _AbstractEntity {
  @ManyToOne(() => Config, (config) => config.sourceFolders)
  config!: Config

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
