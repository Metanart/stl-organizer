import { Entity, ManyToOne } from 'typeorm'

import { AbstractImage } from '../abstract/AbstractImage'

import { Model } from './Model'

@Entity()
export class ModelSourceImage extends AbstractImage {
  @ManyToOne(() => Model, (model) => model.sourceImages, { onDelete: 'CASCADE' })
  model!: Model
}
