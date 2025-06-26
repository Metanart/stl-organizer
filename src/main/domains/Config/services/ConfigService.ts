import { AppDataSource } from '@main/database/AppDataSource'
import { ConfigMapper } from '@main/domains/Config/mappers/ConfigMapper'
import { IsNull, Not } from 'typeorm'

import { ConfigDTO, ConfigUpdateDTO } from '@shared/domains/Config/dto/ConfigDTO'
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
      const config = await repo.save(newConfig)
      log.success(`Saved`, config)
    }

    return ConfigMapper.map(config, Config, ConfigDTO)
  }

  static async update(updatedConfig: ConfigUpdateDTO): Promise<ConfigDTO | null> {
    const log = createLog({ tag: 'ConfigService.update' })

    let currentConfig: Config | null

    try {
      currentConfig = await repo.findOne({ where: { id: updatedConfig.id } })
    } catch (error) {
      log.error((error as Error).message)
      return null
    }

    let finalConfig: Config

    if (currentConfig) {
      log.info(`Found an existing entity - start merge`)
      finalConfig = repo.merge(currentConfig, { ...currentConfig, id: updatedConfig.id })
    } else {
      log.warn(`Entity not found - create a new one and merge`)
      finalConfig = repo.create(updatedConfig)
    }

    const savedConfig = await repo.save(finalConfig)
    log.success(`Saved`, savedConfig)

    return ConfigMapper.map(savedConfig, Config, ConfigDTO)
  }
}
