import { getConfig } from './getConfig'
import { updateConfig } from './updateConfig'

export const ConfigRepo = {
  get: getConfig,
  update: updateConfig
}
