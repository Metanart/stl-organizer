import { AutoMap } from '@automapper/classes'
import { _AbstractEntity } from '@main/domains/Common/entities/abstract/core/_AbstractEntity'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'

import { Source } from './Source'
import { SourceArchive } from './SourceArchive'
import { SourceImage } from './SourceImage'

enum ModelExtensions {
  STL = 'stl',
  OBJ = 'obj',
  _3MF = '3mf',
  STEP = 'step',
  FBX = 'fbx',
  GLB = 'glb',
  GCODE = 'gcode'
}

export type ModelExtensionsType = `${ModelExtensions}`

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
    cascade: ['insert']
  })
  @JoinColumn({ name: 'sourceArchiveId' })
  @AutoMap(() => SourceArchive)
  archive!: SourceArchive

  @OneToMany(() => SourceImage, (sourceImage) => sourceImage.model, {
    eager: true,
    nullable: true,
    cascade: ['insert']
  })
  @AutoMap(() => [SourceImage])
  images!: SourceImage[]

  @ManyToOne(() => Source, (source) => source.models, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sourceId' })
  source!: Source
}

export type SourceModelEntity = SourceModel
