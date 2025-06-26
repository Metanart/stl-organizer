import { classes } from '@automapper/classes'
import { createMap, createMapper } from '@automapper/core'

import {
  ConfigDTO,
  ConfigFormDTO,
  ConfigUpdateDTO,
  ConfigUpdateFormDTO
} from '@shared/domains/Config/dto/ConfigDTO'

export const ConfigMapper = createMapper({
  strategyInitializer: classes()
})

// Server -> Client
createMap(ConfigMapper, ConfigDTO, ConfigFormDTO)

// Client -> Server
createMap(ConfigMapper, ConfigUpdateFormDTO, ConfigUpdateDTO)
