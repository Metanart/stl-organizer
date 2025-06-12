import { Column, Index } from 'typeorm'

import { Actions } from '@shared/enums/common'

import { _AbstractEntity } from './core/_AbstractEntity'

export abstract class AbstractActionLog extends _AbstractEntity {
  @Column()
  name!: string

  @Column({ type: 'enum', enum: Actions })
  @Index()
  action!: Actions
}
