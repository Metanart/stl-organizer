import { BaseTranslation } from '../../i18n-types.generated'

const enConfig: BaseTranslation = {
  pageTitle: 'Config',
  errors: {
    failedUpdate: 'Failed to update config'
  },
  updateForm: {
    fields: {
      outputFolder: {
        label: 'Output folder',
        placeholder: 'path/to/output/folder',
        errors: { required: 'Output path is required', invalid: 'Invalid output path' }
      },
      tempFolder: {
        label: 'Temp Folder',
        placeholder: 'path/to/temporary/folder',
        errors: { required: 'Temp path is required', invalid: 'Invalid temp path' }
      },
      maxThreads: {
        label: 'Max Threads',
        errors: { required: 'Required at least 1 and up to 6 threads' }
      },
      autoProcessOnScan: { label: 'Auto Process on Scan', errors: {} },
      autoArchiveOnComplete: { label: 'Auto Archive on Complete', errors: {} },
      useMultithreading: { label: 'Use Multithreading', errors: {} },
      debugMode: { label: 'Debug Mode', errors: {} }
    }
  }
}

export default enConfig
