import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export abstract class Tag {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  name!: string
}
