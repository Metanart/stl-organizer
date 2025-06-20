import { classes } from '@automapper/classes'
import { createMap, createMapper } from '@automapper/core'
import { Source } from '@main/domains/Sources/entities/Source'
import { SourceModel } from '@main/domains/Sources/entities/SourceModel'

import {
  SourceCreateDTO,
  SourceCreateFormDTO,
  SourceDTO,
  SourceUpdateDTO,
  SourceUpdateFormDTO
} from '../dto/SourceDTO'
import { SourceModelDTO } from '../dto/SourceModelDTO'

export const SourceMapper = createMapper({
  strategyInitializer: classes()
})

createMap(SourceMapper, SourceCreateFormDTO, SourceCreateDTO)
createMap(SourceMapper, SourceUpdateFormDTO, SourceUpdateDTO)

createMap(SourceMapper, SourceModel, SourceModelDTO)
createMap(SourceMapper, Source, SourceDTO)
