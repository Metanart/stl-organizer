import { Column, Entity, ManyToOne } from 'typeorm'

import { AbstractActionLog } from '../abstract/AbstractActionLog'

import { Task } from './Task'

type LogType = 'info' | 'warning' | 'error'

@Entity()
export class TaskLog extends AbstractActionLog {
  @Column({ type: 'varchar', default: 'info', enum: ['info', 'warning', 'error'] })
  type?: LogType

  @Column({ type: 'varchar' })
  message!: string

  @ManyToOne(() => Task, (task) => task.logs, { onDelete: 'CASCADE' })
  task!: Task
}
