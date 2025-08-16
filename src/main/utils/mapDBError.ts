import { QueryFailedError } from 'typeorm'

/**
 * Унифицированные коды ошибок для клиента
 */
export type ClientErrorCode =
  | 'UNIQUE_VIOLATION'
  | 'FOREIGN_KEY_VIOLATION'
  | 'NOT_NULL_VIOLATION'
  | 'CHECK_VIOLATION'
  | 'CONSTRAINT_VIOLATION'

export interface DBError {
  errorCode: ClientErrorCode
  details: {
    table?: string
    columns?: string[]
  }
}

export function mapDbError(error: unknown): DBError | null {
  if (!(error instanceof QueryFailedError)) return null

  const driverErr = error.driverError as { message: string; errno: number }
  const errno: number | undefined = driverErr?.errno
  const message: string = driverErr?.message ?? error.message ?? ''

  if (errno === 19) {
    if (message.includes('UNIQUE constraint failed')) {
      const regex = /UNIQUE constraint failed:\s*(.+)$/
      const match = message.match(regex)
      const columns =
        match && match[1] ? match[1].split(',').map((f) => f.trim().split('.')[1] || f.trim()) : []

      return {
        errorCode: 'UNIQUE_VIOLATION',
        details: {
          table: match && match[1] ? match[1].split('.')[0] : undefined,
          columns
        }
      }
    }

    if (message.includes('FOREIGN KEY constraint failed')) {
      return {
        errorCode: 'FOREIGN_KEY_VIOLATION',
        details: {}
      }
    }

    if (message.includes('NOT NULL constraint failed')) {
      const regex = /NOT NULL constraint failed:\s*(.+)$/
      const match = message.match(regex)
      return {
        errorCode: 'NOT_NULL_VIOLATION',
        details: {
          columns: match && match[1] ? [match[1]] : []
        }
      }
    }

    if (message.includes('CHECK constraint failed')) {
      return {
        errorCode: 'CHECK_VIOLATION',
        details: {}
      }
    }

    return {
      errorCode: 'CONSTRAINT_VIOLATION',
      details: {}
    }
  }

  return null
}
