import { _AbstractEntity } from '@main/database/models/abstract/core/_AbstractEntity'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'

import { Source } from './Source'
import { SourceArchive } from './SourceArchive'
import { SourceImage } from './SourceImage'

@Entity()
export class SourceModel extends _AbstractEntity {
  @Column({ type: 'varchar', nullable: true })
  name!: string

  @Column({ type: 'varchar', nullable: true })
  path!: string

  @OneToOne(() => SourceArchive, (sourceArchive) => sourceArchive.model, {
    cascade: true
  })
  @JoinColumn({ name: 'sourceArchiveId' })
  archive!: SourceArchive

  @OneToMany(() => SourceImage, (sourceImage) => sourceImage.model, { nullable: true })
  images!: SourceImage[]

  @ManyToOne(() => Source, (source) => source.models, { onDelete: 'CASCADE' })
  source!: Source
}

export type SourceModelEntity = SourceModel
