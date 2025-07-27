import { PojosMetadataMap } from '@automapper/pojos'

import { SOURCES_DTO_KEYS } from './Sources.dtos'

PojosMetadataMap.create(SOURCES_DTO_KEYS.SourceDTO, {
  id: String,
  name: String,
  path: String,
  comment: String,
  isEnabled: Boolean
})

PojosMetadataMap.create(SOURCES_DTO_KEYS.SourceFormDTO, {
  id: String,
  name: String,
  path: String,
  comment: String,
  isEnabled: Boolean
})

PojosMetadataMap.create(SOURCES_DTO_KEYS.SourceCreateDTO, {
  name: String,
  path: String,
  comment: String,
  isEnabled: Boolean
})

PojosMetadataMap.create(SOURCES_DTO_KEYS.SourceCreateFormDTO, {
  name: String,
  path: String,
  comment: String,
  isEnabled: Boolean
})
