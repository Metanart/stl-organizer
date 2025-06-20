import { _AbstractEntity } from '@main/domains/Common/entities/abstract/core/_AbstractEntity'
import { Column, Entity, OneToOne } from 'typeorm'

import { TaskQueue } from './TaskQueue'

@Entity()
export class TaskQueueProgress extends _AbstractEntity {
  @Column({ type: 'int', default: 0 })
  totalSteps!: number

  @Column({ type: 'int', default: 0 })
  currentStep!: number

  @Column({ type: 'varchar', nullable: true })
  currentStepEntityId!: number

  @OneToOne(() => TaskQueue, (taskQueue) => taskQueue.progress, { onDelete: 'CASCADE' })
  taskQueue!: TaskQueue
}
