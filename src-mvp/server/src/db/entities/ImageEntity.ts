import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { ModelEntity } from './ModelEntity.js'

@Entity()
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => ModelEntity, (model) => model.images, {
    nullable: false,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'model_id' })
  model: ModelEntity

  @Column()
  name: string

  @Column()
  fullPath: string

  @Column()
  hash: string

  @Column({ default: false })
  isPreview: boolean

  @Column({ type: 'int', default: 1 }) // 1 = external, 2 = inside archive
  source: number

  @Column({ type: 'int', default: 0 })
  order: number

  @Column({ type: 'int', nullable: true })
  width: number

  @Column({ type: 'int', nullable: true })
  height: number
}
