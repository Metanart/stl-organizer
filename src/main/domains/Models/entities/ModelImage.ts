import { Entity, ManyToOne } from 'typeorm'

import { AbstractImage } from '../../../domains/Common/entities/abstract/AbstractImage'

import { ModelVariant } from './ModelVariant'

@Entity()
export class ModelImage extends AbstractImage {
  @ManyToOne(() => ModelVariant, (modelVariant) => modelVariant.images, { onDelete: 'CASCADE' })
  modelVariant!: ModelVariant
}
