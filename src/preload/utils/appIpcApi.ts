import { ipcBridgesConfig } from '@preload/domains/Config/ipc-bridges'
import { ipcBridgesSources } from '@preload/domains/Sources/ipc-bridges'

export const appIpcApi = {
  config: ipcBridgesConfig,
  sources: ipcBridgesSources
}
