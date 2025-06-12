import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI & {
      selectFolder: () => Promise<string | null>
    }
    api: unknown
  }
}
