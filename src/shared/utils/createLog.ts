import { consola, ConsolaInstance, LogLevel } from 'consola'

import { ApiTag } from '@shared/domains/Common/types/api'
import { ProjectArea } from '@shared/domains/Common/types/common'
import { IpcTag, IpcTagCustom } from '@shared/domains/Common/types/ipc'
import { ServiceTag } from '@shared/domains/Common/types/services'

import { getEnv } from './getEnv'

const ENV_LOGS_ENABLED = getEnv('VITE_LOGS_ENABLED') === 'true'
const ENV_LOG_LEVEL = (getEnv('VITE_LOGS_LEVEL') || 4) as LogLevel

// Позволяет включать/отключать категории логов через env или config
const ENABLED_CATEGORIES = (getEnv('VITE_LOGS_CATEGORIES') || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

type LogCategory = 'MAIN' | 'RENDERER'

type LogOptions = {
  tag?: ApiTag | IpcTag | IpcTagCustom | ServiceTag | ProjectArea
  category?: LogCategory
  level?: LogLevel
}

const createLog = (options: LogOptions = {}): ConsolaInstance => {
  const { tag, category = 'MAIN', level } = options

  const isCategoryEnabled = ENV_LOGS_ENABLED && ENABLED_CATEGORIES.includes(category)

  const log = isCategoryEnabled
    ? consola.create({
        level: level ?? ENV_LOG_LEVEL,
        formatOptions: { colors: true }
      })
    : consola.create({ level: 0 })

  return log.withTag(`${category}${tag ? `: ${tag}` : ''}`)
}

export { createLog }
export type { LogCategory }
