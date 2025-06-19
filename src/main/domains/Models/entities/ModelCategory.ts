import { _AbstractEntity } from '@main/domains/Common/entities/abstract/core/_AbstractEntity'
import { Model } from '@main/domains/Models/entities/Model'
import { Column, Entity, Index, OneToMany } from 'typeorm'

@Entity()
export class ModelCategory extends _AbstractEntity {
  @Column({ unique: true })
  @Index()
  name!: string

  @Column({ nullable: true })
  description?: string

  @OneToMany(() => Model, (model) => model.category)
  models!: Model[]
}
