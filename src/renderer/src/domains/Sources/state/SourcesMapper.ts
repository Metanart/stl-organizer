import {
  SourceCreateDTO,
  SourceDTO,
  SourceInputDTO,
  SourceRemoveDTO
} from '@shared/domains/Sources/types'

import { Source, SourceNew, SourceRemove, SourcesList, SourcesState } from './types'

function fromDTO(dto: SourceDTO): Source {
  return {
    id: dto.id,
    path: dto.path,
    isEnabled: dto.isEnabled,
    comment: dto.comment ?? null
  }
}

function fromDTOs(dtos: SourceDTO[]): SourcesList {
  const state: SourcesState = {}

  dtos.forEach((dto) => {
    state[dto.id] = fromDTO(dto)
  })

  return state
}

function toInputDTO(item: Source): SourceInputDTO {
  return {
    id: item.id,
    path: item.path,
    isEnabled: item.isEnabled,
    comment: item.comment ?? null
  }
}

function toCreateDTO(item: SourceNew): SourceCreateDTO {
  return {
    path: item.path,
    isEnabled: item.isEnabled,
    comment: item.comment ?? null
  }
}

function toRemoveDTO(item: SourceRemove): SourceRemoveDTO {
  return {
    id: item.id
  }
}

export const SourcesMapper = {
  fromDTO,
  fromDTOs,
  toInputDTO,
  toCreateDTO,
  toRemoveDTO
}
