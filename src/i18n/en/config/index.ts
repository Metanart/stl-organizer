import { BaseTranslation } from '../../i18n-types.generated'

const enConfig: BaseTranslation = {
  pageTitle: 'Config',
  errors: {
    failedUpdate: 'Failed to update config'
  },
  form: {
    fields: {
      outputFolder: { label: 'Output folder' },
      tempFolder: { label: 'Temp Folder' },
      maxThreads: { label: 'Max Threads' },
      autoProcessOnScan: { label: 'Auto Process on Scan' },
      autoArchiveOnComplete: { label: 'Auto Archive on Complete' },
      useMultithreading: { label: 'Use Multithreading' },
      debugMode: { label: 'Debug Mode' }
    }
  }
}

export default enConfig
