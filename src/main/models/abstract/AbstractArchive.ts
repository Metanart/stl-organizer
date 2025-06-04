import { Column } from 'typeorm'

import { ArchiveExtensions } from '@shared/enums/extensions'

import { _AbstractFile } from './core/_AbstractFile'

export abstract class AbstractArchive extends _AbstractFile {
  @Column({ type: 'enum', enum: ArchiveExtensions })
  extension!: string
}
