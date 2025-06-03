import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

import { ArchiveEntity } from './ArchiveEntity.js'
import { ImageEntity } from './ImageEntity.js'
import { PathEntity } from './PathEntity.js'

@Entity()
export class ModelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  name: string // normalized name, e.g. "dragon-model-v2"

  @Column({ unique: true })
  safeName: string // e.g. for URL or filesystem: "dragon-model-v2"

  @Column({ default: false })
  isDeleted: boolean

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => PathEntity, { nullable: false })
  @JoinColumn({ name: 'path_id' })
  path: PathEntity

  @OneToMany(() => ArchiveEntity, (archive) => archive.model)
  archives: ArchiveEntity[]

  @OneToMany(() => ImageEntity, (image) => image.model)
  images: ImageEntity[]
}
