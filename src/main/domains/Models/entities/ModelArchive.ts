import { Entity, ManyToOne } from 'typeorm'

import { AbstractArchive } from '../../../domains/Common/entities/abstract/AbstractArchive'

import { ModelVariant } from './ModelVariant'

@Entity()
export class ModelArchive extends AbstractArchive {
  @ManyToOne(() => ModelVariant, (modelVariant) => modelVariant.archives, { onDelete: 'CASCADE' })
  modelVariant!: ModelVariant
}
