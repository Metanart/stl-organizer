import { CreateDateColumn, Index, PrimaryGeneratedColumn } from 'typeorm'

export abstract class _AbstractEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @CreateDateColumn()
  @Index()
  createdAt!: Date
}
