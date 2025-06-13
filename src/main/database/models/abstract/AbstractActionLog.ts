import { Column, Index } from 'typeorm'

import { _AbstractEntity } from './core/_AbstractEntity'

export abstract class AbstractActionLog extends _AbstractEntity {
  @Column()
  name!: string

  @Column({ type: 'varchar' })
  @Index()
  text!: string
}
