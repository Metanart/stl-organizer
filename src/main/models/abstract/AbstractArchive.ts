import { Column } from 'typeorm'

import { ArchiveExtensiions } from '@shared/enums/extensions'

import { _AbstractFile } from './core/_AbstractFile'

export abstract class AbstractArchive extends _AbstractFile {
  @Column({ type: 'enum', enum: ArchiveExtensiions })
  extension!: string
}
