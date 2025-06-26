import { classes } from '@automapper/classes'
import { createMap, createMapper } from '@automapper/core'
import { Source } from '@main/domains/Sources/entities/Source'

import { SourceDTO } from '@shared/domains/Sources/dto/SourceDTO'

export const SourcesMapper = createMapper({
  strategyInitializer: classes()
})

// DB -> Server
createMap(SourcesMapper, Source, SourceDTO)
