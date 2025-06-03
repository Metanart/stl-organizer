import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

export abstract class _AbstractEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @CreateDateColumn()
  createdAt!: Date
}
