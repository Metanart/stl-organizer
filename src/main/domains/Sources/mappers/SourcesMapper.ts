import { createMap, createMapper } from '@automapper/core'
import { pojos, PojosMetadataMap } from '@automapper/pojos'
import { Source } from '@main/domains/Sources/entities/Source'

import { SOURCES_DTO_KEYS } from '@shared/domains/Sources/dtos/SourceDTO'

PojosMetadataMap.create<Source>('Source', {
  id: String,
  path: String,
  name: String,
  comment: String,
  isEnabled: Boolean
})

export const SourcesMapper = createMapper({
  strategyInitializer: pojos()
})

createMap(SourcesMapper, SOURCES_DTO_KEYS.Source, SOURCES_DTO_KEYS.SourceDTO)
