import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  UpdateDateColumn
} from 'typeorm'

import type { ModelStatus } from '@shared/database/types'

import { _AbstractEntity } from '../abstract/core/_AbstractEntity'
import { Category } from '../common/Category'
import { Source } from '../common/Source'
import { Tag } from '../common/Tag'

import { ModelAuthor } from './ModelAuthor'
import { ModelSourceArchive } from './ModelSourceArchive'
import { ModelSourceImage } from './ModelSourceImage'
import { ModelVariant } from './ModelVariant'

@Entity()
@Index(['status'])
@Index(['author'])
@Index(['category'])
@Index(['createdAt'])
@Index(['normalizedName'])
@Index(['category', 'status'])
export class Model extends _AbstractEntity {
  @Column()
  @Index()
  name!: string

  @Column()
  @Index()
  normalizedName!: string

  @Column()
  path!: string

  @Column({ type: 'varchar' })
  status!: ModelStatus

  @OneToOne(() => ModelSourceArchive, (sourceArchive) => sourceArchive.model, {
    cascade: true
  })
  @JoinColumn({ name: 'sourceArchiveId' })
  sourceArchive!: ModelSourceArchive

  @OneToMany(() => ModelSourceImage, (image) => image.model)
  sourceImages!: ModelSourceImage[]

  @OneToMany(() => ModelVariant, (modelVariant) => modelVariant.model)
  variants!: ModelVariant[]

  @ManyToOne(() => ModelAuthor, { nullable: true })
  @JoinColumn({ name: 'authorId' })
  author!: ModelAuthor

  @ManyToOne(() => Category, { cascade: true, nullable: true })
  category!: Category

  @ManyToMany(() => Tag, { cascade: true, nullable: true })
  @JoinTable({
    name: 'ModelTags',
    joinColumn: { name: 'modelId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' }
  })
  tags!: Tag[]

  @ManyToOne(() => Source, { nullable: true })
  Source?: Source

  @UpdateDateColumn()
  updatedAt!: Date
}
