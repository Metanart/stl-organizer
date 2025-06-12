import { Column } from 'typeorm'

import { ImageExtension } from '@shared/enums/extensions'

import { _AbstractFile } from './core/_AbstractFile'

export abstract class AbstractImage extends _AbstractFile {
  @Column({ type: 'enum', enum: ImageExtension })
  extension!: string

  @Column()
  width!: number

  @Column()
  height!: number

  @Column({ nullable: true })
  category?: string

  @Column({ default: false })
  isPreview!: boolean
}
