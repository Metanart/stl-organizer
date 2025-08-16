import { BaseTranslation } from '../../i18n-types.generated'

const enApp: BaseTranslation = {
  navigation: {
    home: 'Home',
    models: 'Models',
    sources: 'Sources',
    tasks: 'Tasks',
    config: 'Config'
  },
  actions: {
    cancel: 'Cancel',
    save: 'Save'
  },
  dbErrors: {
    unknown: 'Unknown error',
    responseIsEmpty: 'Response is empty',
    uniqueViolation: 'Duplicate value in the "{column}" field',
    notNullViolation: '"{column}" is required',
    foreignKeyViolation: 'Related record not found',
    checkViolation: 'Data validation failed',
    constraintViolation: 'Constraint violation'
  }
}

export default enApp
