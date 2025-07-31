export const ConfigUpdateFormDataQa = {
  outputFolderInput: 'config-update-form-output-folder-input',
  tempFolderInput: 'config-update-form-temp-folder-input',
  maxThreadsInput: 'config-update-form-max-threads-input',
  autoProcessOnScanSwitch: 'config-update-form-auto-process-on-scan-switch',
  autoArchiveOnCompleteSwitch: 'config-update-form-auto-archive-on-complete-switch',
  useMultithreadingSwitch: 'config-update-form-use-multithreading-switch',
  debugModeSwitch: 'config-update-form-debug-mode-switch',
  submitButton: 'config-update-form-submit-button'
} as const

export type ConfigUpdateFormDataQaType = typeof ConfigUpdateFormDataQa
