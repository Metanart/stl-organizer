// /main/mappers/configMapper.ts
import { SourceEntity, SourceEntityNew } from '@main/database/models/source/Source'

import { SourceCreateDTO, SourceDTO, SourceInputDTO } from '@shared/domains/Sources/types'

function toDTO(entity: SourceEntity): SourceDTO {
  return {
    id: entity.id,
    path: entity.path,
    isEnabled: entity.isEnabled,
    comment: entity.comment ?? null
  } satisfies SourceDTO
}

function toDTOs(entities: SourceEntity[]): SourceDTO[] {
  return entities.map((entity) => toDTO(entity))
}

function fromInputDTO(dto: SourceInputDTO): SourceEntity {
  return {
    id: dto.id,
    path: dto.path,
    isEnabled: dto.isEnabled,
    comment: dto.comment ?? null
  }
}

function fromCreateDTO(dto: SourceCreateDTO): SourceEntityNew {
  return {
    path: dto.path,
    isEnabled: dto.isEnabled,
    comment: dto.comment ?? null
  }
}

function fromInputDTOs(dtos: SourceInputDTO[]): SourceEntity[] {
  return dtos.map((dto) => fromInputDTO(dto))
}

function fromCreateDTOs(dtos: SourceCreateDTO[]): SourceEntityNew[] {
  return dtos.map((dto) => fromCreateDTO(dto))
}

export const SourcesMapper = {
  toDTO,
  toDTOs,
  fromInputDTO,
  fromCreateDTO,
  fromInputDTOs,
  fromCreateDTOs
}
