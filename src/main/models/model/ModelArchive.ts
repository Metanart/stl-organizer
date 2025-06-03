import { Entity, ManyToOne } from 'typeorm'

import { AbstractArchive } from '../abstract/AbstractArchive'

import { ModelVariant } from './ModelVariant'

@Entity()
export class ModelArchive extends AbstractArchive {
  @ManyToOne(() => ModelVariant, (modelVariant) => modelVariant.archives, { onDelete: 'CASCADE' })
  modelVariant!: ModelVariant
}
