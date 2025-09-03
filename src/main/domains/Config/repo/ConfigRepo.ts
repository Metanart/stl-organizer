import { AppDataSource } from '@main/database/AppDataSource'
import { ConfigMapper } from '@main/domains/Config/mappers/ConfigMapper'
import { IsNull, Not } from 'typeorm'

import { CONFIG_DTO_KEYS, ConfigDTO, ConfigUpdateDTO } from '@shared/domains/Config/Config.dtos'
import { createLog } from '@shared/utils/createLog'

import { Config } from '../entities/Config'

const repo = AppDataSource.getRepository(Config)

export class ConfigRepo {
  static async get(): Promise<ConfigDTO> {
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

  static async update(updatedConfig: ConfigUpdateDTO): Promise<ConfigDTO | null> {
    const log = createLog({ tag: 'ConfigRepo.update' })

    log.info('Updating config with payload', updatedConfig)

    let existingConfig: Config | null

    try {
      existingConfig = await repo.findOne({
        where: {
          id: Not(IsNull())
        }
      })
    } catch (error) {
      log.error('Failed to fetch existing config from database:', (error as Error).message)
      throw new Error('Failed to fetch config from the database')
    }

    let finalConfig: Config

    if (existingConfig) {
      log.info('Existing config found — merging changes')
      finalConfig = repo.merge(existingConfig, { ...existingConfig, ...updatedConfig })
    } else {
      log.warn('Config not found — creating a new one')
      finalConfig = repo.create(updatedConfig)
    }

    let savedConfig: Config
    try {
      savedConfig = await repo.save(finalConfig)
      log.success('Config saved successfully', savedConfig)
    } catch (error) {
      log.error('Failed to save config to database:', (error as Error).message)
      throw new Error('Failed to save config to the database')
    }

    let mappedDTO: ConfigDTO
    try {
      mappedDTO = ConfigMapper.map<Config, ConfigDTO>(
        savedConfig,
        CONFIG_DTO_KEYS.Config,
        CONFIG_DTO_KEYS.ConfigDTO
      )
      log.info('Mapped saved config to DTO', mappedDTO)
    } catch (error) {
      log.error('Failed to map saved config:', (error as Error).message)
      throw new Error('Failed to map saved config')
    }

    return mappedDTO
  }
}
