import { Column, Index } from 'typeorm'

import { _AbstractEntity } from './core/_AbstractEntity'

export abstract class AbstractActionLog extends _AbstractEntity {
  @Column({ type: 'varchar' })
  name!: string

  @Column({ type: 'varchar' })
  @Index()
  text!: string
}
