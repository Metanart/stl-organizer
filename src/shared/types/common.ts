export type SourceFolderType = 'torrent' | 'manual' | 'download'

export type TaskStatus = 'pending' | 'processing' | 'paused' | 'done' | 'error'

export type Response<T> = {
  error?: string | null
  data: T | null
}
