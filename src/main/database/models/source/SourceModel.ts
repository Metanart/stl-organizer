import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'

import { _AbstractEntity } from '../abstract/core/_AbstractEntity'
import { SourceArchive } from '../source/SourceArchive'

import { Source } from './Source'
import { SourceImage } from './SourceImage'

@Entity()
export class SourceModel extends _AbstractEntity {
  @Column()
  @Index()
  name!: string

  @Column()
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
