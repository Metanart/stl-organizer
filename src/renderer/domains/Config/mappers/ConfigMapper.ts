import { createMap, createMapper } from '@automapper/core'
import { pojos } from '@automapper/pojos'

import {
  CONFIG_DTO_KEYS,
  ConfigDTO,
  ConfigFormDTO,
  ConfigUpdateDTO,
  ConfigUpdateFormDTO
} from '@shared/domains/Config/Config.dtos'

import '@shared/domains/Config/ConfigMapper.metadata'

export const ConfigMapper = createMapper({
  strategyInitializer: pojos()
})

createMap<ConfigDTO, ConfigFormDTO>(
  ConfigMapper,
  CONFIG_DTO_KEYS.ConfigDTO,
  CONFIG_DTO_KEYS.ConfigFormDTO
)

createMap<ConfigUpdateFormDTO, ConfigUpdateDTO>(
  ConfigMapper,
  CONFIG_DTO_KEYS.ConfigUpdateFormDTO,
  CONFIG_DTO_KEYS.ConfigUpdateDTO
)
