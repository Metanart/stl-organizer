import { LL } from '@i18n/utils/i18n-LL.sync'
import { DBError } from '@main/types/DBError.types'

export const convertDBErrorToMessage = (error: DBError): string | null => {
  if (!error) return null

  if (error.message) return error.message

  switch (error.code) {
    case 'UNIQUE_VIOLATION':
      return LL.app.dbErrors.uniqueViolation({
        column: error.columns?.[0] || 'unknown'
      })

    case 'NOT_NULL_VIOLATION':
      return LL.app.dbErrors.notNullViolation({
        column: error.columns?.[0] || 'unknown'
      })

    case 'FOREIGN_KEY_VIOLATION':
      return LL.app.dbErrors.foreignKeyViolation()

    case 'CHECK_VIOLATION':
      return LL.app.dbErrors.checkViolation()

    case 'CONSTRAINT_VIOLATION':
      return LL.app.dbErrors.constraintViolation()

    default:
      return null
  }
}
