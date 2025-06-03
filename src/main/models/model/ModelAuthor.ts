import { Column, Entity, OneToMany } from 'typeorm'

import { _AbstractEntity } from '../abstract/core/_AbstractEntity'

import { Model } from './Model'

@Entity()
export class ModelAuthor extends _AbstractEntity {
  @Column({ unique: true })
  name!: string

  @OneToMany(() => Model, (model) => model.author)
  models!: Model
}
