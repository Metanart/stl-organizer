import { AbstractImage } from '@main/database/models/abstract/AbstractImage'
import { Entity, ManyToOne } from 'typeorm'

import { SourceModel } from './SourceModel'

@Entity()
export class SourceImage extends AbstractImage {
  @ManyToOne(() => SourceModel, (sourceModel) => sourceModel.images, { onDelete: 'CASCADE' })
  model!: SourceModel
}

export type SourceImageEntity = SourceImage
