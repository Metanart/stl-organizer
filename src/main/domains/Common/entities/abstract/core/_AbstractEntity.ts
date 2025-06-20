import { AutoMap } from '@automapper/classes'
import { CreateDateColumn, Index, PrimaryGeneratedColumn } from 'typeorm'

export abstract class _AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id!: string

  @CreateDateColumn()
  @Index()
  @AutoMap()
  createdAt!: Date
}
