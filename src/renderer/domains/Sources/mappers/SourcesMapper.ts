import { createMap, createMapper } from '@automapper/core'
import { pojos } from '@automapper/pojos'

import {
  SourceCreateDTO,
  SourceCreateFormDTO,
  SourceDTO,
  SourceFormDTO,
  SOURCES_DTO_KEYS,
  SourceUpdateDTO,
  SourceUpdateFormDTO
} from '@shared/domains/Sources/Sources.dtos'

import './SourcesMapper.metadata'

export const SourcesMapper = createMapper({
  strategyInitializer: pojos()
})

createMap<SourceDTO, SourceFormDTO>(
  SourcesMapper,
  SOURCES_DTO_KEYS.SourceDTO,
  SOURCES_DTO_KEYS.SourceFormDTO
)

createMap<SourceFormDTO, SourceDTO>(
  SourcesMapper,
  SOURCES_DTO_KEYS.SourceFormDTO,
  SOURCES_DTO_KEYS.SourceDTO
)

createMap<SourceCreateFormDTO, SourceCreateDTO>(
  SourcesMapper,
  SOURCES_DTO_KEYS.SourceCreateFormDTO,
  SOURCES_DTO_KEYS.SourceCreateDTO
)

createMap<SourceUpdateFormDTO, SourceUpdateDTO>(
  SourcesMapper,
  SOURCES_DTO_KEYS.SourceUpdateFormDTO,
  SOURCES_DTO_KEYS.SourceUpdateDTO
)
