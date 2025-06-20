import { Column, Entity } from 'typeorm'

import { _AbstractEntity } from '../../Common/entities/abstract/core/_AbstractEntity'

enum Type {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}

export type SourcePayload = {
  sourceId: string
}

export type TaskType = `${Type}`

export interface TaskPayloadMap {
  sourceScan: SourcePayload
  sourceImport: SourcePayload
}

export type TaskPayload = {
  [K in keyof TaskPayloadMap]: { type: K; payload: TaskPayloadMap[K] }
}[keyof TaskPayloadMap]

@Entity()
export class Task extends _AbstractEntity {
  @Column({ type: 'enum', enum: Type })
  type!: Type

  @Column({ type: 'json' })
  payload!: TaskPayload
}

export type TaskEntity = Task
