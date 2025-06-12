import { Column, Entity, ManyToOne } from 'typeorm'

import { ModelFileExtension } from '@shared/enums/extensions'

import { _AbstractFile } from '../abstract/core/_AbstractFile'

import { ModelVariant } from './ModelVariant'

@Entity()
export class ModelFile extends _AbstractFile {
  @Column({ type: 'enum', enum: ModelFileExtension })
  extension!: ModelFileExtension

  @ManyToOne(() => ModelVariant, (modelVariant) => modelVariant.files, { onDelete: 'CASCADE' })
  modelVariant!: ModelVariant
}
