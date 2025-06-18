// /main/mappers/configMapper.ts
import { SourceCreateEntity, SourceEntity } from '@main/domains/Sources/entities/Source'

import {
  SourceCreateDTO,
  SourceDTO,
  SourceInputDTO
} from '@shared/domains/Sources/types/Source.types'

function toDTO(entity: SourceEntity): SourceDTO {
  return {
    id: entity.id,
    name: entity.name,
    path: entity.path,
    isEnabled: entity.isEnabled,
    comment: entity.comment ?? null,
    models: []
  } satisfies SourceDTO
}

function toDTOs(entities: SourceEntity[]): SourceDTO[] {
  return entities.map((entity) => toDTO(entity))
}

function fromInputDTO(dto: SourceInputDTO): SourceEntity {
  return {
    id: dto.id,
    name: dto.name,
    path: dto.path,
    isEnabled: dto.isEnabled,
    comment: dto.comment ?? null,
    models: []
  }
}

function fromCreateDTO(dto: SourceCreateDTO): SourceCreateEntity {
  return {
    name: dto.name,
    path: dto.path,
    isEnabled: dto.isEnabled,
    comment: dto.comment ?? null,
    models: []
  }
}

function fromInputDTOs(dtos: SourceInputDTO[]): SourceEntity[] {
  return dtos.map((dto) => fromInputDTO(dto))
}

function fromCreateDTOs(dtos: SourceCreateDTO[]): SourceCreateEntity[] {
  return dtos.map((dto) => fromCreateDTO(dto))
}

export const SourceMapper = {
  toDTO,
  toDTOs,
  fromInputDTO,
  fromCreateDTO,
  fromInputDTOs,
  fromCreateDTOs
}
