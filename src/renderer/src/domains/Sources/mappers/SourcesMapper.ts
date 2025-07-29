import { createMap, createMapper } from '@automapper/core'
import { pojos } from '@automapper/pojos'

import {
  SOURCE_DTO_KEYS,
  SourceCreateDTO,
  SourceCreateFormDTO,
  SourceDTO,
  SourceFormDTO,
  SourceUpdateDTO,
  SourceUpdateFormDTO
} from '@shared/domains/Sources/Sources.dtos'

import './SourcesMapper.metadata'

export const SourcesMapper = createMapper({
  strategyInitializer: pojos()
})

createMap<SourceDTO, SourceFormDTO>(
  SourcesMapper,
  SOURCE_DTO_KEYS.SourceDTO,
  SOURCE_DTO_KEYS.SourceFormDTO
)

createMap<SourceFormDTO, SourceDTO>(
  SourcesMapper,
  SOURCE_DTO_KEYS.SourceFormDTO,
  SOURCE_DTO_KEYS.SourceDTO
)

createMap<SourceCreateFormDTO, SourceCreateDTO>(
  SourcesMapper,
  SOURCE_DTO_KEYS.SourceCreateFormDTO,
  SOURCE_DTO_KEYS.SourceCreateDTO
)

createMap<SourceUpdateFormDTO, SourceUpdateDTO>(
  SourcesMapper,
  SOURCE_DTO_KEYS.SourceUpdateFormDTO,
  SOURCE_DTO_KEYS.SourceUpdateDTO
)
