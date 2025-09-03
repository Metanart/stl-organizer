import { consola, ConsolaInstance, LogLevel } from 'consola'

import { ApiTag } from '@shared/domains/Common/types/Api.types'
import { Domain, ProjectArea } from '@shared/domains/Common/types/Common.types'
import { IpcTag, IpcTagCustom } from '@shared/domains/Common/types/IPC.types'
import { RepoTag } from '@shared/domains/Common/types/Services.types'

import { getEnv } from './getEnv'

const ENV_LOGS_ENABLED = getEnv('VITE_LOGS_ENABLED') === 'true'

export type LogCategory = ProjectArea

type LogOptions = {
  tag?: Domain | ApiTag | IpcTag | IpcTagCustom | RepoTag | ProjectArea
  category?: LogCategory
  level?: LogLevel
}

const createLog = (options: LogOptions = {}): ConsolaInstance => {
  const { tag, category = 'MAIN', level } = options

  const isCategoryEnabled = ENV_LOGS_ENABLED

  const log = isCategoryEnabled
    ? consola.create({
        level: level || 5,
        formatOptions: { colors: true }
      })
    : consola.create({ level: 0 })

  return log.withTag(`${category}${tag ? `: ${tag}` : ''}`)
}

export { createLog }
