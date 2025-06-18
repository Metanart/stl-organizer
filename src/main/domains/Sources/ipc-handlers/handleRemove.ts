import { AppDataSource } from '@main/database/AppDataSource'
import { Source } from '@main/database/models/source/Source'
import { DBHandler } from '@main/types'

import { SourceRemoveDTO } from '@shared/domains/Sources/types'
import { createLog } from '@shared/utils/createLog'

export const handleRemove: DBHandler<SourceRemoveDTO | null, SourceRemoveDTO> = async function (
  payload
) {
  const log = createLog({ ipcTag: 'sources:remove' })

  const repo = AppDataSource.getRepository(Source)

  const deleted = await repo.delete({ id: payload.id })

  if (deleted) {
    log.info(`Deleted source by id ${payload.id}`)
    return { id: payload.id }
  }

  log.error(`Source by id "${payload.id}" is not deleted`)

  return null
}
