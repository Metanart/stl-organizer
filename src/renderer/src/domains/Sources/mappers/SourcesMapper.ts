import { createMap, createMapper } from '@automapper/core'
import { pojos } from '@automapper/pojos'
import { PojosMetadataMap } from '@automapper/pojos'

import {
  SourceCreateDTO,
  SourceCreateFormDTO,
  SourceDTO,
  SourceFormDTO,
  SOURCES_DTO_KEYS,
  SourceUpdateDTO,
  SourceUpdateFormDTO
} from '@shared/domains/Sources/Sources.dtos'

PojosMetadataMap.create<SourceDTO>('SourceDTO', {
  id: String,
  path: String,
  name: String,
  comment: String,
  isEnabled: Boolean
})

PojosMetadataMap.create<SourceCreateDTO>('SourceCreateDTO', {
  path: String,
  name: String,
  comment: String,
  isEnabled: Boolean
})

PojosMetadataMap.create<SourceUpdateDTO>('SourceUpdateDTO', {
  id: String,
  path: String,
  name: String,
  comment: String,
  isEnabled: Boolean
})

PojosMetadataMap.create<SourceFormDTO>('SourceFormDTO', {
  id: String,
  path: String,
  name: String,
  comment: String,
  isEnabled: Boolean
})

PojosMetadataMap.create<SourceCreateFormDTO>('SourceCreateFormDTO', {
  path: String,
  name: String,
  comment: String,
  isEnabled: Boolean
})

PojosMetadataMap.create<SourceUpdateFormDTO>('SourceUpdateFormDTO', {
  id: String,
  path: String,
  name: String,
  comment: String,
  isEnabled: Boolean
})

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
