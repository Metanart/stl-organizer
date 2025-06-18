import {
  SourceCreateDTO,
  SourceDTO,
  SourceInputDTO,
  SourceRemoveDTO
} from '@shared/domains/Sources/types/Source.types'

import {
  Source,
  SourceCreate,
  SourceRemove,
  SourcesList,
  SourcesState
} from '../types/Source.types'

import { SourceModelMapper } from './SourceModelMapper'

function fromDTO(dto: SourceDTO): Source {
  return {
    id: dto.id,
    name: dto.name,
    path: dto.path,
    isEnabled: dto.isEnabled,
    comment: dto.comment ?? null,
    models: SourceModelMapper.fromDTOs(dto.models)
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
    name: item.name,
    path: item.path,
    isEnabled: item.isEnabled,
    comment: item.comment ?? null,
    models: SourceModelMapper.toDTOs(item.models)
  }
}

function toCreateDTO(item: SourceCreate): SourceCreateDTO {
  return {
    name: item.name,
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

export const SourceMapper = {
  fromDTO,
  fromDTOs,
  toInputDTO,
  toCreateDTO,
  toRemoveDTO
}
