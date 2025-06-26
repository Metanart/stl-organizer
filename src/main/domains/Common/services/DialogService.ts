import { dialog } from 'electron'

export class DialogService {
  static async selectFolder(): Promise<string | null> {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory']
    })

    if (result.canceled || result.filePaths.length === 0) return null

    return result.filePaths[0]
  }
}
