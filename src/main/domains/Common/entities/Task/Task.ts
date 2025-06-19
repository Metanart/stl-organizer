import { Column, Entity, OneToMany, OneToOne } from 'typeorm'

import { _AbstractEntity } from '../abstract/core/_AbstractEntity'

import { TaskLog } from './TaskLog'
import { TaskProgress } from './TaskProgress'

export type TaskType = 'sourceScan' | 'archiveExtract'

export type TaskStatus = 'pending' | 'processing' | 'paused' | 'done' | 'error'

@Entity()
export class Task extends _AbstractEntity {
  @Column({ type: 'varchar' })
  type!: TaskType

  @Column({ type: 'varchar' })
  status!: TaskStatus

  @OneToOne(() => TaskProgress, (progress) => progress.task)
  progress!: TaskProgress

  @OneToMany(() => TaskLog, (taskLog) => taskLog.task)
  logs!: TaskLog[]
}
