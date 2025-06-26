import { createMap, createMapper } from '@automapper/core'
import { pojos } from '@automapper/pojos'
import { Source } from '@main/domains/Sources/entities/Source'

import { SourceDTO } from '@shared/domains/Sources/dto/SourceDTO'

export const SourcesMapper = createMapper({
  strategyInitializer: pojos()
})

// DB -> Server
createMap(SourcesMapper, Source, SourceDTO)
