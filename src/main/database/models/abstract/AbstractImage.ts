import { Column } from 'typeorm'

import type { ImageExtensions } from '@shared/domains/Common/types/extensions.types'

import { _AbstractFile } from './core/_AbstractFile'

export abstract class AbstractImage extends _AbstractFile {
  @Column({ type: 'varchar' })
  extension!: ImageExtensions

  @Column()
  width!: number

  @Column()
  height!: number

  @Column({ nullable: true })
  category?: string

  @Column({ default: false })
  isPreview!: boolean
}
