import { BaseTranslation } from '../../i18n-types.generated'

const enSources: BaseTranslation = {
  pageTitle: 'Sources',
  errors: {
    failedCreate: 'Failed to create a new source folder'
  },
  createForm: {
    title: 'Add new source folder',

    fields: {
      name: {
        label: 'Name',
        placeholder: 'Short source name',
        errors: { required: 'Name is required', invalid: 'Invalid characters in name' }
      },
      path: {
        label: 'Path',
        placeholder: '/path/to/folder',
        errors: { required: 'Path is required', invalid: 'Invalid path' }
      },
      comment: {
        label: 'Comment',
        placeholder: 'Optional description...'
      },
      isEnabled: {
        label: 'Enabled'
      }
    }
  }
}

export default enSources
