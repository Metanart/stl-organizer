import { SourceFolder } from '@main/models/common/SourceFolder'

declare global {
  interface Window {
    api: {
      sourceFolders: {
        getAll: () => Promise<SourceFolder[]>
      }
    }
  }
}
