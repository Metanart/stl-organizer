import { classes } from '@automapper/classes'
import { createMap, createMapper } from '@automapper/core'
import { Config } from '@main/domains/Config/entities/Config'

import { ConfigDTO } from '@shared/domains/Config/dto/ConfigDTO'

export const ConfigMapper = createMapper({
  strategyInitializer: classes()
})

// DB -> Server
createMap(ConfigMapper, Config, ConfigDTO)
