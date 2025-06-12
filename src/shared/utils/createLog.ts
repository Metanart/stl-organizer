import { consola, ConsolaInstance, LogLevel } from 'consola'

import { IpcTag } from '@shared/types/ipc-tags'

import { getEnv } from './getEnv'

const ENV_LOGS_ENABLED = getEnv('VITE_LOGS_ENABLED') === 'true'
const ENV_LOG_LEVEL = (getEnv('VITE_LOGS_LEVEL') || 4) as LogLevel

const createLog = (options: {
  ipcTag?: IpcTag
  channel?: string
  level?: LogLevel
}): ConsolaInstance => {
  const { ipcTag, channel, level } = options

  const log = ENV_LOGS_ENABLED
    ? consola.create({
        level: level || ENV_LOG_LEVEL,
        formatOptions: {
          colors: true
        }
      })
    : consola.create({ level: 0 })

  return log.withTag(ipcTag || channel || '')
}

export { createLog }
