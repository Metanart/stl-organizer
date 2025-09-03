import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'

import { _AbstractEntity } from '@main/domains/Common/entities/abstract/core/_AbstractEntity'

import { Task } from './Task'
import { TaskQueueLog } from './TaskQueueLog'
import { TaskQueueProgress } from './TaskQueueProgress'

enum Status {
  PENDING = 'pending',
  PROCESSING = 'processing',
  PAUSED = 'paused',
  DONE = 'done',
  ERROR = 'error'
}

export type TaskQueueStatusType = `${Status}`

@Entity()
export class TaskQueue extends _AbstractEntity {
  @OneToOne(() => Task, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'taskId' })
  task!: Task

  @Column({ type: 'varchar', nullable: true })
  workerId?: string

  @Column({ type: 'varchar' })
  groupId!: string

  @Column({ type: 'enum', default: Status.PENDING, enum: Status })
  status!: Status

  @OneToOne(() => TaskQueueProgress, (progress) => progress.taskQueue, {
    cascade: true,
    eager: true
  })
  @JoinColumn({ name: 'progressId' })
  progress!: TaskQueueProgress

  @OneToMany(() => TaskQueueLog, (taskQueueLog) => taskQueueLog.taskQueue)
  logs!: TaskQueueLog[]

  @OneToOne(() => TaskQueue, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'blockedByQueueId' })
  blockedBy?: TaskQueue

  @Column({ type: 'timestamp', nullable: true })
  lockedAt?: Date

  @Column({ type: 'timestamp', nullable: true })
  completedAt?: Date

  @Column({ type: 'timestamp', nullable: true })
  failedAt?: Date

  @Column({ type: 'varchar', nullable: true })
  error?: string
}
