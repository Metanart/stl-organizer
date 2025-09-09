import { Entity, JoinColumn, ManyToOne } from 'typeorm'

import { AbstractImage } from '@main/domains/Common/entities/abstract/AbstractImage'

import { SourceModel } from './SourceModel'

@Entity()
export class SourceImage extends AbstractImage {
  @ManyToOne(() => SourceModel, (sourceModel) => sourceModel.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sourceModelId' })
  model!: SourceModel
}
