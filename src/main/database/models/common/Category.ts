import { Column, Entity, Index, OneToMany } from 'typeorm'

import { _AbstractEntity } from '../abstract/core/_AbstractEntity'
import { Model } from '../model/Model'

@Entity()
export class Category extends _AbstractEntity {
  @Column({ unique: true })
  @Index()
  name!: string

  @Column({ nullable: true })
  description?: string

  @OneToMany(() => Model, (model) => model.category)
  models!: Model[]
}
