import { AutoMap } from '@automapper/classes'
import { _AbstractEntity } from '@main/domains/Common/entities/abstract/core/_AbstractEntity'
import { ModelExtensions } from '@main/domains/Common/enums'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'

import { Source } from './Source'
import { SourceArchive } from './SourceArchive'
import { SourceImage } from './SourceImage'

@Entity()
export class SourceModel extends _AbstractEntity {
  @Column({ type: 'varchar', nullable: true })
  @AutoMap()
  name!: string

  @Column({ type: 'varchar', nullable: true })
  @AutoMap()
  path!: string

  @Column({ type: 'enum', default: ModelExtensions.STL, enum: ModelExtensions })
  @AutoMap()
  extension!: string

  @Column({ type: 'varchar', nullable: true })
  @AutoMap()
  comment!: string

  @OneToOne(() => SourceArchive, (sourceArchive) => sourceArchive.model, {
    eager: true,
    cascade: false
  })
  @JoinColumn({ name: 'sourceArchiveId' })
  @AutoMap(() => SourceArchive)
  archive!: SourceArchive

  @OneToMany(() => SourceImage, (sourceImage) => sourceImage.model, {
    eager: true,
    nullable: true,
    cascade: false
  })
  @AutoMap(() => [SourceImage])
  images!: SourceImage[]

  @ManyToOne(() => Source, (source) => source.models, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sourceId' })
  source!: Source
}
