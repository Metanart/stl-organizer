import { _AbstractEntity } from '@main/domains/Common/entities/abstract/core/_AbstractEntity'
import { Column, Entity, OneToOne } from 'typeorm'

import { Task } from './Task'

@Entity()
export class TaskProgress extends _AbstractEntity {
  @Column({ type: 'int', default: 0 })
  totalSteps!: number

  @Column({ type: 'int', default: 0 })
  currentStep!: number

  @Column({ type: 'int', nullable: true })
  currentEntityId!: number

  @OneToOne(() => Task, (task) => task.progress, { onDelete: 'CASCADE' })
  task!: Task
}
