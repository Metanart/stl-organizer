import { createMap, createMapper } from '@automapper/core'
import { pojos } from '@automapper/pojos'

import { SOURCES_DTO_KEYS } from '@shared/domains/Sources/Sources.dtos'

import './SourcesMapper.metadata'
import '@shared/domains/Sources/SourcesMapper.metadata'

export const SourcesMapper = createMapper({
  strategyInitializer: pojos()
})

createMap(SourcesMapper, SOURCES_DTO_KEYS.Source, SOURCES_DTO_KEYS.SourceDTO)
