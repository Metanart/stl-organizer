import { Column, Entity, OneToMany, OneToOne, UpdateDateColumn } from 'typeorm'

import type { TaskStatus } from '@shared/database/types'

import { _AbstractEntity } from '../abstract/core/_AbstractEntity'
import { ModelVariant } from '../model/ModelVariant'

import { TaskLog } from './TaskLog'

@Entity()
export class Task extends _AbstractEntity {
  @OneToOne(() => ModelVariant, (modelVariant) => modelVariant.task)
  modelVariant!: ModelVariant

  @OneToMany(() => TaskLog, (taskLog) => taskLog.id)
  logs!: TaskLog[]

  @Column({ type: 'varchar' })
  status!: TaskStatus

  @Column({ type: 'int', default: 0 })
  progress!: number

  @Column({ type: 'boolean', default: false })
  isPaused!: boolean

  @UpdateDateColumn()
  updatedAt!: Date
}
