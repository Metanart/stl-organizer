export type SourceFoldersItem = {
  id: number
  path: string
  isEnabled: boolean
  lastScannedAt?: string
  comment?: string
  sourceType: 'torrent' | 'manual' | 'download'
}
