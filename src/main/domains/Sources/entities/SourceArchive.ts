import { Entity, OneToOne } from 'typeorm'

import { AbstractArchive } from '@main/domains/Common/entities/abstract/AbstractArchive'

import { SourceModel } from './SourceModel'

@Entity()
export class SourceArchive extends AbstractArchive {
  @OneToOne(() => SourceModel, (sourceModel) => sourceModel.archive, { onDelete: 'CASCADE' })
  model!: SourceModel
}
