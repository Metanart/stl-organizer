import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { Task } from './Task'

@Entity()
export class TaskQueue {
  @ManyToOne(() => Task, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'taskId' })
  task!: Task

  @Column({ type: 'varchar', nullable: true })
  workerId?: string

  @ManyToOne(() => Task, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'blockedByTaskId' })
  blockedBy?: Task

  @Column({ type: 'timestamp', nullable: true })
  lockedAt?: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date
}
