import { Column } from 'typeorm'

import { _AbstractFile } from './core/_AbstractFile'

enum ArchiveExtensions {
  ZIP = 'zip',
  RAR = 'rar',
  _7Z = '7z'
}

export type ArchiveExtensionsType = `${ArchiveExtensions}`

export abstract class AbstractArchive extends _AbstractFile {
  @Column({ type: 'enum', default: ArchiveExtensions.ZIP, enum: ArchiveExtensions })
  extension!: ArchiveExtensions
}
