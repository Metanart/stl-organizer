import { _AbstractEntity } from '@main/domains/Common/entities/abstract/core/_AbstractEntity'
import { ModelTag } from '@main/domains/Models/entities/ModelTag'
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  UpdateDateColumn
} from 'typeorm'

import { ModelAuthor } from './ModelAuthor'
import { ModelCategory } from './ModelCategory'
import { ModelVariant } from './ModelVariant'

export type ModelStatus =
  | 'new'
  | 'ready'
  | 'processing'
  | 'completed'
  | 'error'
  | 'archived'
  | 'deleted'

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

  @OneToMany(() => ModelVariant, (modelVariant) => modelVariant.model)
  variants!: ModelVariant[]

  @ManyToOne(() => ModelAuthor, { nullable: true })
  @JoinColumn({ name: 'authorId' })
  author!: ModelAuthor

  @ManyToOne(() => ModelCategory, { cascade: true, nullable: true })
  category!: ModelCategory

  @ManyToMany(() => ModelTag, { cascade: true, nullable: true })
  @JoinTable({
    name: 'ModelTags',
    joinColumn: { name: 'modelId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'modelTagId', referencedColumnName: 'id' }
  })
  tags!: ModelTag[]

  @UpdateDateColumn()
  updatedAt!: Date
}
