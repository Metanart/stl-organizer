import { Column, Entity, OneToMany, UpdateDateColumn } from 'typeorm'

import { _AbstractEntity } from '../abstract/core/_AbstractEntity'

import { InputDir } from './InputDir'

@Entity()
export class AppConfig extends _AbstractEntity {
  @OneToMany(() => InputDir, (dir) => dir.config, { cascade: true })
  inputDirs!: InputDir[]

  @Column()
  outputDir!: string

  @Column()
  maxThreads!: number

  @Column({ default: false })
  autoProcessOnScan!: boolean

  @Column({ default: false })
  autoArchiveOnComplete!: boolean

  @Column({ default: true })
  useMultithreading!: boolean

  @Column({ default: false })
  debugMode!: boolean

  @UpdateDateColumn()
  updatedAt!: Date
}
