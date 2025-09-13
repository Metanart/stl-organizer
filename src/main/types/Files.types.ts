export type FileEntry = {
  /** Абсолютный путь до файла */
  path: string

  /** Имя файла с расширением */
  name: string

  /** Размер файла в байтах */
  size: number

  /** Расширение в нижнем регистре (без точки), например "zip", "jpg" */
  ext: string
}
