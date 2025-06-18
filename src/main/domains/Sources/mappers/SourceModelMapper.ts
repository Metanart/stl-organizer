// /main/mappers/configMapper.ts

import {
  SourceArchiveDTO,
  SourceImageDTO,
  SourceModelDTO
} from '@shared/domains/Sources/types/SourceModel.types'

import { SourceImage } from '../entities/SourceImage'
import { SourceModelEntity } from '../entities/SourceModel'

const imagesToDTOs = (images: SourceImage[]): SourceImageDTO[] => {
  return images ? images.map((image) => ({ id: image.id, path: image.path })) : []
}

const archiveToDTO = (archive: SourceModelEntity['archive']): SourceArchiveDTO => {
  return {
    path: archive.path
  }
}

function toDTO(entity: SourceModelEntity): SourceModelDTO {
  return {
    id: entity.id,
    name: entity.name,
    path: entity.path,
    archive: archiveToDTO(entity.archive),
    images: imagesToDTOs(entity.images)
  } satisfies SourceModelDTO
}

function toDTOs(entities: SourceModelEntity[]): SourceModelDTO[] {
  return entities.map((entity) => toDTO(entity))
}

export const SourceModelMapper = {
  toDTO,
  toDTOs
}
