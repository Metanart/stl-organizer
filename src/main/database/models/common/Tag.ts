import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Model } from '../model/Model'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  name!: string

  @ManyToMany(() => Model, (model) => model.tags)
  models!: Model[]
}
