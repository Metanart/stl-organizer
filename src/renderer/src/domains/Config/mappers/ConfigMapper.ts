import { createMap, createMapper } from '@automapper/core'
import { pojos } from '@automapper/pojos'

import {
  CONFIG_DTO_KEYS,
  ConfigDTO,
  ConfigFormDTO,
  ConfigUpdateDTO,
  ConfigUpdateFormDTO
} from '@shared/domains/Config/dtos/ConfigDTO'

import '@shared/domains/Config/dtos/ConfigDTOMetadata'

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
