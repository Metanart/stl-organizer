import {
  SourceCreateDTO,
  SourceDTO,
  SourceInputDTO,
  SourcesDTO
} from '@shared/domains/Sources/types'

import { SourceItem, SourceItemNew, SourcesState } from '../types'

export function mapFromDTOToSourcesItem(dto: SourceDTO): SourceItem {
  return {
    id: dto.id,
    path: dto.path,
    isEnabled: dto.isEnabled,
    comment: dto.comment ?? null
  }
}

export function mapFromSourcesItemToDTO(item: SourceItem): SourceInputDTO {
  return {
    id: item.id,
    path: item.path,
    isEnabled: item.isEnabled ?? true,
    comment: item.comment ?? null
  }
}

export function mapNewItemToCreateDTO(item: SourceItemNew): SourceCreateDTO {
  return {
    path: item.path,
    isEnabled: item.isEnabled ?? true,
    comment: item.comment ?? null
  }
}

export function mapFromDTOsToSourcesState(dtos: SourcesDTO): SourcesState {
  const state: SourcesState = {}

  dtos.forEach((dto) => {
    state[dto.id] = mapFromDTOToSourcesItem(dto)
  })

  return state
}

export function mapFromSourcesStateToDTOs(state: SourcesState): SourceInputDTO[] {
  return Object.values(state).map((item) => mapFromSourcesItemToDTO(item))
}
