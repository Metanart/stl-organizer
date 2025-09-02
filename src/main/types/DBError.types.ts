export type DBErrorCode =
  | 'UNIQUE_VIOLATION'
  | 'FOREIGN_KEY_VIOLATION'
  | 'NOT_NULL_VIOLATION'
  | 'CHECK_VIOLATION'
  | 'CONSTRAINT_VIOLATION'

export type DBError = {
  code?: DBErrorCode
  message?: string
  table?: string
  columns?: string[]
}
