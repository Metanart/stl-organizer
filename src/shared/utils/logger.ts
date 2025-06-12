import { consola, LogLevel } from 'consola'

import { getEnv } from './getEnv'

const isEnabled = getEnv('VITE_LOGS_ENABLED') === 'true'
const logLevel = (getEnv('VITE_LOGS_LEVEL') || 4) as LogLevel

const logger = isEnabled
  ? consola.create({
      level: logLevel,
      formatOptions: {
        colors: true
      }
    })
  : consola.create({ level: 0 })

export { logger }
