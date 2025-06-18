import { Entity, ManyToOne } from 'typeorm'

import { AbstractImage } from '../abstract/AbstractImage'

import { SourceModel } from './SourceModel'

@Entity()
export class SourceImage extends AbstractImage {
  @ManyToOne(() => SourceModel, (sourceModel) => sourceModel.images, { onDelete: 'CASCADE' })
  model!: SourceModel
}
