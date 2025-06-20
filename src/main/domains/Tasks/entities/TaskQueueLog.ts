import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { AbstractActionLog } from '../../Common/entities/abstract/AbstractActionLog'

import { TaskQueue } from './TaskQueue'

enum Type {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}

export type TaskQueueLogType = `${Type}`

@Entity()
export class TaskQueueLog extends AbstractActionLog {
  @Column({ type: 'varchar', default: Type.INFO })
  type?: Type

  @Column()
  message!: string

  @ManyToOne(() => TaskQueue, (taskQueue) => taskQueue.logs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskQueueId' })
  taskQueue!: TaskQueue
}
