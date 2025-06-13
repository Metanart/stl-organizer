export type Source = {
  id: number
  path: string
  isEnabled: boolean
  lastScannedAt?: string
  comment?: string
  sourceType: 'torrent' | 'manual' | 'download'
}
