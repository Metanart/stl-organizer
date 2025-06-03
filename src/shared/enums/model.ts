export enum ModelStatus {
  NEW = 'new', // Model just discovered (archive + photos found)
  READY = 'ready', // Ready for user processing (in UI)
  PROCESSING = 'processing', // Unpacking, normalization, hashing in progress
  COMPLETED = 'completed', // Processing completely completed
  ERROR = 'error', // An error occurred during processing
  ARCHIVED = 'archived', // Model packed into final archive
  DELETED = 'deleted' // Deleted (but left in DB for history)
}
