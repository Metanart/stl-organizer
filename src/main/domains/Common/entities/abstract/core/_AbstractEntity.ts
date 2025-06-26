import { CreateDateColumn, Index, PrimaryGeneratedColumn } from 'typeorm'

export abstract class _AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn()
  @Index()
  createdAt!: Date
}
