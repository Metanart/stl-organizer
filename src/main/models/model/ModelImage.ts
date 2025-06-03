import { Entity, ManyToOne } from 'typeorm'

import { AbstractImage } from '../abstract/AbstractImage'

import { ModelVariant } from './ModelVariant'

@Entity()
export class ModelImage extends AbstractImage {
  @ManyToOne(() => ModelVariant, (modelVariant) => modelVariant.images, { onDelete: 'CASCADE' })
  modelVariant!: ModelVariant
}
