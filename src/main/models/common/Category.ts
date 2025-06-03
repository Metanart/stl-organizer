import { Column, Entity, Index } from 'typeorm'

import { _AbstractEntity } from '../abstract/core/_AbstractEntity'

@Entity()
export class Category extends _AbstractEntity {
  @Column({ unique: true })
  @Index()
  name!: string

  @Column({ nullable: true })
  description?: string
}
