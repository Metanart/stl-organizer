import { AppDataSource } from '@main/database/AppDataSource'
import { ConfigMapper } from '@main/domains/Config/mappers/ConfigMapper'
import { IsNull, Not } from 'typeorm'

import { CONFIG_DTO_KEYS, ConfigDTO, ConfigUpdateDTO } from '@shared/domains/Config/dtos/ConfigDTO'
import { createLog } from '@shared/utils/createLog'

import { Config } from '../entities/Config'

const repo = AppDataSource.getRepository(Config)

export class ConfigService {
  static async get(): Promise<ConfigDTO | null> {
    const log = createLog({ tag: 'ConfigService.get' })

    let config: Config | null

    try {
      config = await repo.findOne({
        where: {
          id: Not(IsNull())
        }
      })
    } catch (error) {
      log.error((error as Error).message)
      return null
    }

    if (!config) {
      log.error('Config not found - create a new one')
      const newConfig = repo.create()
      config = await repo.save(newConfig)
      log.success(`Saved`, config)
    }

    log.info(`Got`, config)

    const mappedDTO = ConfigMapper.map<Config, ConfigDTO>(
      config,
      CONFIG_DTO_KEYS.Config,
      CONFIG_DTO_KEYS.ConfigDTO
    )

    log.info(`Got mapped`, mappedDTO)

    return mappedDTO
  }

  static async update(updatedConfig: ConfigUpdateDTO): Promise<ConfigDTO | null> {
    const log = createLog({ tag: 'ConfigService.update' })

    log.info(`Updating`, updatedConfig)

    let existingConfig: Config | null

    try {
      existingConfig = await repo.findOne({ where: { id: updatedConfig.id } })
    } catch (error) {
      log.error((error as Error).message)
      return null
    }

    let finalConfig: Config

    if (existingConfig) {
      log.info(`Found an existing entity - start merge`, existingConfig)
      finalConfig = repo.merge(existingConfig, { ...existingConfig, ...updatedConfig })
    } else {
      finalConfig = repo.create(updatedConfig)
      log.info(`Entity not found - create a new one and merge`, finalConfig)
    }

    const savedConfig = await repo.save(finalConfig)
    log.success(`Saved`, savedConfig)

    const mappedDTO = ConfigMapper.map<Config, ConfigDTO>(
      savedConfig,
      CONFIG_DTO_KEYS.Config,
      CONFIG_DTO_KEYS.ConfigDTO
    )

    log.info(`Mapped`, savedConfig)

    return mappedDTO
  }
}
