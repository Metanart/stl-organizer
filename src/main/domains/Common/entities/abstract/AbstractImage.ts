import { Column } from 'typeorm'

import { _AbstractFile } from './core/_AbstractFile'

enum ImageExtensions {
  JPG = 'jpg',
  JPEG = 'jpeg',
  PNG = 'png',
  WEBP = 'webp',
  GIF = 'gif',
  BMP = 'bmp',
  TIFF = 'tiff',
  TIF = 'tif',
  AVIF = 'avif'
}

export type ImageExtensionsType = `${ImageExtensions}`

export abstract class AbstractImage extends _AbstractFile {
  @Column({ type: 'enum', enum: ImageExtensions })
  extension!: ImageExtensions

  @Column({ type: 'int' })
  width!: number

  @Column({ type: 'int' })
  height!: number

  @Column({ type: 'boolean', default: false })
  isPreview!: boolean
}
