import { Column, Entity, OneToMany } from 'typeorm'

import { _AbstractEntity } from '../abstract/core/_AbstractEntity'

import { SourceModel } from './SourceModel'

@Entity()
export class Source extends _AbstractEntity {
  @Column({ type: 'varchar', unique: true })
  path!: string

  @OneToMany(() => SourceModel, (sourceModel) => sourceModel.source, { nullable: true })
  models!: SourceModel[]
}

export type SourceEntity = Source

export type SourceEntityNew = Omit<SourceEntity, 'id'>
