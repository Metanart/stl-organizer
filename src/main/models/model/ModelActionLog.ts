import { Entity, ManyToOne } from 'typeorm'

import { AbstractActionLog } from '@/models/abstract/AbstractActionLog'

import { Model } from './Model'

@Entity()
export class ModelActionLog extends AbstractActionLog {
  @ManyToOne(() => Model, { onDelete: 'CASCADE' })
  model!: Model
}
