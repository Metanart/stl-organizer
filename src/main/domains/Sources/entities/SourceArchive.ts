import { AbstractArchive } from '@main/database/models/abstract/AbstractArchive'
import { Entity, OneToOne } from 'typeorm'

import { SourceModel } from './SourceModel'

@Entity()
export class SourceArchive extends AbstractArchive {
  @OneToOne(() => SourceModel, (sourceModel) => sourceModel.archive, { onDelete: 'CASCADE' })
  model!: SourceModel
}

export type SourceArchiveEntity = SourceArchive
