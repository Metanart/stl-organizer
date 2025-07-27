import { BaseTranslation } from '../../i18n-types.generated'

const enSources: BaseTranslation = {
  pageTitle: 'Sources',
  createForm: {
    title: 'Create Source',
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
