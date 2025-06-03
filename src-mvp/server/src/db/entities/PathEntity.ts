import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class PathEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  path: string

  @Column({ default: true })
  isActive: boolean
}
