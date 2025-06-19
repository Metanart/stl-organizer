import { Model } from '@main/domains/Models/entities/Model'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ModelTag {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  name!: string

  @ManyToMany(() => Model, (model) => model.tags)
  models!: Model[]
}
