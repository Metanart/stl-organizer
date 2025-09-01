import { BaseTranslation } from '../../i18n-types.generated'

const enSources: BaseTranslation = {
  pageTitle: 'Sources',
  dataGrid: {
    notify: {
      removed: 'Source removed',
      failedRemove: 'Failed to remove source'
    }
  },
  createForm: {
    title: 'Add new source folder',
    notify: {
      success: 'New source folder created successfully',
      isEmpty: 'Form is empty',
      failedCreate: 'Failed to create a new source folder'
    },
    fields: {
      name: {
        label: 'Name',
        placeholder: 'Short source name',
        errors: {
          required: 'Name is required (3 chars min)',
          invalid: 'Invalid characters in name'
        }
      },
      path: {
        label: 'Path',
        placeholder: '/path/to/folder',
        errors: { required: 'Path is required (3 chars min)', invalid: 'Invalid path' }
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
