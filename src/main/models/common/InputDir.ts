import { Column, Entity, ManyToOne } from 'typeorm'

import { _AbstractEntity } from '../abstract/core/_AbstractEntity'

import { AppConfig } from './AppConfig'

@Entity()
export class InputDir extends _AbstractEntity {
  @ManyToOne(() => AppConfig, (config) => config.inputDirs)
  config!: AppConfig

  @Column()
  path!: string

  @Column({ default: true })
  isEnabled!: boolean

  @Column({ type: 'datetime', nullable: true })
  lastScannedAt?: Date

  @Column({ nullable: true })
  comment?: string

  @Column({ default: 'manual' })
  sourceType!: 'torrent' | 'manual' | 'download'
}
