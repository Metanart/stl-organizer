import { Column } from 'typeorm'

import type { ImageExtensions } from '@shared/domains/Common/types/extensions.types'

import { _AbstractFile } from './core/_AbstractFile'

export abstract class AbstractImage extends _AbstractFile {
  @Column({ type: 'varchar' })
  extension!: ImageExtensions

  @Column({ type: 'int' })
  width!: number

  @Column({ type: 'int' })
  height!: number

  @Column({ type: 'varchar', nullable: true })
  category?: string

  @Column({ type: 'boolean', default: false })
  isPreview!: boolean
}
