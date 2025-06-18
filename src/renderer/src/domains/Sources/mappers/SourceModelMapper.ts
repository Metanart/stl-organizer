import {
  SourceArchiveDTO,
  SourceImageDTO,
  SourceModelDTO
} from '@shared/domains/Sources/types/SourceModel.types'

import { SourceArchive, SourceImage, SourceModel } from '../types/SourceModel.types'

function fromDTO(dto: SourceModelDTO): SourceModel {
  return {
    id: dto.id,
    name: dto.name,
    path: dto.path,
    archive: dto.archive as SourceArchive,
    images: dto.images as SourceImage[]
  }
}

function fromDTOs(dtos: SourceModelDTO[]): SourceModel[] {
  return dtos.map((dto) => fromDTO(dto))
}

function toDTO(item: SourceModel): SourceModelDTO {
  return {
    id: item.id,
    name: item.name,
    path: item.path,
    archive: item.archive as SourceArchiveDTO,
    images: item.images as SourceImageDTO[]
  }
}

function toDTOs(items: SourceModel[]): SourceModelDTO[] {
  return items.map((item) => toDTO(item))
}

export const SourceModelMapper = {
  fromDTO,
  fromDTOs,
  toDTO,
  toDTOs
}
