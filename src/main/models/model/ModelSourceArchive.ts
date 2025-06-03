import { Entity, OneToOne } from 'typeorm'

import { AbstractArchive } from '../abstract/AbstractArchive'

import { Model } from './Model'

@Entity()
export class ModelSourceArchive extends AbstractArchive {
  @OneToOne(() => Model, (model) => model.sourceArchive, { onDelete: 'CASCADE' })
  model!: Model
}
