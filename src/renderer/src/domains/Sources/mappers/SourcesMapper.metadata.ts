import { PojosMetadataMap } from '@automapper/pojos'

import {
  SourceCreateDTO,
  SourceCreateFormDTO,
  SourceDTO,
  SourceFormDTO,
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

PojosMetadataMap.create<SourceFormDTO>('SourceFormDTO', {
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

PojosMetadataMap.create<SourceCreateFormDTO>('SourceCreateFormDTO', {
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

PojosMetadataMap.create<SourceUpdateFormDTO>('SourceUpdateFormDTO', {
  id: String,
  path: String,
  name: String,
  comment: String,
  isEnabled: Boolean
})
