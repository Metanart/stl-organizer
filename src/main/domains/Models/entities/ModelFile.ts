import { Column, Entity, ManyToOne } from 'typeorm'

import type { ModelFileExtensions } from '@shared/domains/Common/types/extensions.types'

import { _AbstractFile } from '../../../domains/Common/entities/abstract/core/_AbstractFile'

import { ModelVariant } from './ModelVariant'

@Entity()
export class ModelFile extends _AbstractFile {
  @Column({ type: 'varchar' })
  extension!: ModelFileExtensions

  @ManyToOne(() => ModelVariant, (modelVariant) => modelVariant.files, { onDelete: 'CASCADE' })
  modelVariant!: ModelVariant
}
