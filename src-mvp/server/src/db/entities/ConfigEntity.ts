import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class ConfigEntity {
  @PrimaryColumn()
  key: string

  @Column()
  value: string
}
