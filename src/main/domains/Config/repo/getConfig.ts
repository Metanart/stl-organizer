import { IsNull, Not } from 'typeorm'

import { AppDataSource } from '@main/database/AppDataSource'
import { ConfigMapper } from '@main/domains/Config/mappers/ConfigMapper'

import { CONFIG_DTO_KEYS, ConfigDTO } from '@shared/domains/Config/Config.dtos'
import { createLog } from '@shared/utils/logs/createLog'

import { Config } from '../entities/Config'

const repo = AppDataSource.getRepository(Config)

export async function getConfig(): Promise<ConfigDTO> {
  const log = createLog({ tag: 'ConfigRepo.get' })

  let config: Config | null

  try {
    config = await repo.findOne({
      where: {
        id: Not(IsNull())
      }
    })
  } catch (error) {
    log.error('Failed to query config from database:', (error as Error).message)
    throw new Error('Error getting configuration from database')
  }

  if (!config) {
    log.warn('No config found — creating new default config')
    try {
      const newConfig = repo.create()
      config = await repo.save(newConfig)
      log.success('New default config saved', config)
    } catch (error) {
      log.error('Failed to create new config:', (error as Error).message)
      throw new Error('Failed to create new configuration')
    }
  } else {
    log.info('Existing config retrieved', config)
  }

  let mappedDTO: ConfigDTO

  try {
    mappedDTO = ConfigMapper.map<Config, ConfigDTO>(
      config,
      CONFIG_DTO_KEYS.Config,
      CONFIG_DTO_KEYS.ConfigDTO
    )
    log.info('Mapped config to DTO', mappedDTO)
  } catch (error) {
    log.error('Failed to map config to DTO:', (error as Error).message)
    throw new Error('Failed to map config')
  }

  return mappedDTO
}
