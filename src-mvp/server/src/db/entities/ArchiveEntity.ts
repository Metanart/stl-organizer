import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { ModelEntity } from './ModelEntity.js'

@Entity()
export class ArchiveEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => ModelEntity, (model) => model.archives, {
    nullable: false,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'model_id' })
  model: ModelEntity

  @Column()
  name: string

  @Column()
  fullPath: string

  @Column('float')
  sizeMb: number

  @Column()
  type: string // e.g. zip or rar

  @Column()
  hash: string
}
