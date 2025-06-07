import { Column, Entity, UpdateDateColumn } from 'typeorm'

@Entity()
export class Config {
  @Column({ type: 'varchar', nullable: true })
  outputFolder!: string

  @Column({ type: 'varchar', nullable: true })
  tempFolder!: string

  @Column({ type: 'int', default: 4 })
  maxThreads!: number

  @Column({ type: 'boolean', default: false })
  autoProcessOnScan!: boolean

  @Column({ type: 'boolean', default: false })
  autoArchiveOnComplete!: boolean

  @Column({ type: 'boolean', default: true })
  useMultithreading!: boolean

  @Column({ type: 'boolean', default: false })
  debugMode!: boolean

  @UpdateDateColumn()
  updatedAt!: Date
}
