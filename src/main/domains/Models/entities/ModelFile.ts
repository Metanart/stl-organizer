import { Column, Entity, ManyToOne } from 'typeorm'

import { ModelExtensions } from '@main/domains/Common/enums'

import { _AbstractFile } from '../../../domains/Common/entities/abstract/core/_AbstractFile'

import { ModelVariant } from './ModelVariant'

@Entity()
export class ModelFile extends _AbstractFile {
  @Column({ type: 'enum', default: ModelExtensions.STL, enum: ModelExtensions })
  extension!: string

  @ManyToOne(() => ModelVariant, (modelVariant) => modelVariant.files, { onDelete: 'CASCADE' })
  modelVariant!: ModelVariant
}
