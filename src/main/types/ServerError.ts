export type ServerErrorCode =
  | 'UNIQUE_VIOLATION'
  | 'FOREIGN_KEY_VIOLATION'
  | 'NOT_NULL_VIOLATION'
  | 'CHECK_VIOLATION'
  | 'CONSTRAINT_VIOLATION'

export type ServerError = {
  code?: ServerErrorCode
  message?: string
  table?: string
  columns?: string[]
}
