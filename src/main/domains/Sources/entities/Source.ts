import { _AbstractEntity } from '@main/domains/Common/entities/abstract/core/_AbstractEntity'
import { Column, Entity, OneToMany } from 'typeorm'

import { SourceModel } from './SourceModel'

@Entity()
export class Source extends _AbstractEntity {
  @Column({ type: 'varchar', unique: true })
  path!: string

  @Column({ type: 'varchar', nullable: true })
  name!: string

  @Column({ type: 'boolean', default: true })
  isEnabled!: boolean

  @Column({ type: 'varchar', nullable: true })
  comment!: string | null

  @OneToMany(() => SourceModel, (sourceModel) => sourceModel.source, { nullable: true })
  models!: SourceModel[]
}

export type SourceEntity = Source

export type SourceCreateEntity = Omit<SourceEntity, 'id'>
