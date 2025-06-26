import { createMap, createMapper } from '@automapper/core'
import { pojos } from '@automapper/pojos'

import {
  SourceCreateDTO,
  SourceCreateFormDTO,
  SourceDTO,
  SourceFormDTO,
  SourceUpdateDTO,
  SourceUpdateFormDTO
} from '@shared/domains/Sources/dto/SourceDTO'

export const SourcesMapper = createMapper({
  strategyInitializer: pojos()
})

// Server -> Client
createMap(SourcesMapper, SourceDTO, SourceFormDTO)

// Client -> Server
createMap(SourcesMapper, SourceFormDTO, SourceDTO)
createMap(SourcesMapper, SourceCreateFormDTO, SourceCreateDTO)
createMap(SourcesMapper, SourceUpdateFormDTO, SourceUpdateDTO)
