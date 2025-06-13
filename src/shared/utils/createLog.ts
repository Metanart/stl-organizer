import { consola, ConsolaInstance, LogLevel } from 'consola'

import { IpcTag } from '@shared/domains/Common/types/ipc.types'

import { getEnv } from './getEnv'

const ENV_LOGS_ENABLED = getEnv('VITE_LOGS_ENABLED') === 'true'
const ENV_LOG_LEVEL = (getEnv('VITE_LOGS_LEVEL') || 4) as LogLevel

// Позволяет включать/отключать категории логов через env или config
const ENABLED_CATEGORIES = (getEnv('VITE_LOGS_CATEGORIES') || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

type LogCategory = 'main' | 'renderer' | 'worker' | 'ipc' | 'analyzer' | 'importer' | 'normalizer'

type LogOptions = {
  ipcTag?: IpcTag
  channel?: string
  category?: LogCategory
  level?: LogLevel
}

const createLog = (options: LogOptions = {}): ConsolaInstance => {
  const { ipcTag, channel, category = 'main', level } = options

  const isCategoryEnabled = ENV_LOGS_ENABLED && ENABLED_CATEGORIES.includes(category)

  const log = isCategoryEnabled
    ? consola.create({
        level: level ?? ENV_LOG_LEVEL,
        formatOptions: { colors: true }
      })
    : consola.create({ level: 0 })

  return log.withTag(`${category}${ipcTag ? `:${ipcTag}` : channel ? `:${channel}` : ''}`)
}

export { createLog }
export type { LogCategory }
