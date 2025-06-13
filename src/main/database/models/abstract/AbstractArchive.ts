import { Column } from 'typeorm'

import type { ArchiveExtensions } from '@shared/domains/Common/types/extensions.types'

import { _AbstractFile } from './core/_AbstractFile'

export abstract class AbstractArchive extends _AbstractFile {
  @Column({ type: 'varchar' })
  extension!: ArchiveExtensions
}
