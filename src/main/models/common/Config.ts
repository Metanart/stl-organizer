import { Column, Entity, OneToMany, UpdateDateColumn } from 'typeorm'

import { _AbstractEntity } from '../abstract/core/_AbstractEntity'

import { SourceFolder } from './SourceFolder'

@Entity()
export class Config extends _AbstractEntity {
  @OneToMany(() => SourceFolder, (sourceFolder) => sourceFolder.config, { cascade: true })
  sourceFolders!: SourceFolder[]

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
