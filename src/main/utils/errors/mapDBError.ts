import { QueryFailedError } from 'typeorm'

import { DBError } from '@main/types/DBError.types'

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
        code: 'UNIQUE_VIOLATION',
        table: match && match[1] ? match[1].split('.')[0] : undefined,
        columns
      }
    }
  }

  if (message.includes('FOREIGN KEY constraint failed')) {
    return {
      code: 'FOREIGN_KEY_VIOLATION'
    }
  }

  if (message.includes('NOT NULL constraint failed')) {
    const regex = /NOT NULL constraint failed:\s*(.+)$/
    const match = message.match(regex)
    return {
      code: 'NOT_NULL_VIOLATION',
      table: match && match[1] ? match[1].split('.')[0] : undefined,
      columns: match && match[1] ? [match[1]] : []
    }
  }

  if (message.includes('CHECK constraint failed')) {
    return {
      code: 'CHECK_VIOLATION'
    }
  }

  return {
    code: 'CONSTRAINT_VIOLATION'
  }
}
