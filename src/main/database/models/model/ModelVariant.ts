import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'

import { _AbstractEntity } from '../abstract/core/_AbstractEntity'
import { Task } from '../common/Task'

import { Model } from './Model'
import { ModelArchive } from './ModelArchive'
import { ModelFile } from './ModelFile'
import { ModelImage } from './ModelImage'

@Entity()
export class ModelVariant extends _AbstractEntity {
  @Column({ default: 0 })
  sortIndex!: number

  @Column()
  name!: string

  @Column()
  normalizedName!: string

  @ManyToOne(() => Model, (model) => model.variants, { onDelete: 'CASCADE' })
  model!: Model

  @OneToMany(() => ModelFile, (file) => file.modelVariant)
  files!: ModelFile[]

  @OneToMany(() => ModelImage, (image) => image.modelVariant)
  images!: ModelImage[]

  @OneToMany(() => ModelArchive, (archive) => archive.modelVariant)
  archives!: ModelArchive[]

  @OneToOne(() => Task, (task) => task.modelVariant, {
    cascade: true
  })
  @JoinColumn({ name: 'taskId' })
  task!: Task
}
