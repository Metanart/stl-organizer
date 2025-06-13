export type SourceFolderType = 'torrent' | 'manual' | 'download'

export type TaskStatus = 'pending' | 'processing' | 'paused' | 'done' | 'error'

export type ModelStatus =
  | 'new'
  | 'ready'
  | 'processing'
  | 'completed'
  | 'error'
  | 'archived'
  | 'deleted'
