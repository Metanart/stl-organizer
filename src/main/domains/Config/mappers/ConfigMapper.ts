import { createMap, createMapper } from '@automapper/core'
import { pojos } from '@automapper/pojos'

import { CONFIG_DTO_KEYS, ConfigDTO } from '@shared/domains/Config/Config.dtos'

import { Config } from '../entities/Config'

import '@shared/domains/Config/ConfigMapper.metadata'
import './ConfigMapper.metadata'

export const ConfigMapper = createMapper({
  strategyInitializer: pojos()
})

createMap<Config, ConfigDTO>(ConfigMapper, CONFIG_DTO_KEYS.Config, CONFIG_DTO_KEYS.ConfigDTO)
