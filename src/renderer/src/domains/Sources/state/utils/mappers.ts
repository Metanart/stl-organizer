import { SourceDTO, SourceInputDTO, SourcesDTO } from '@shared/domains/Sources/types'

import { SourceItem, SourcesState } from '../types'

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

export function mapFromDTOsToSourcesState(dtos: SourcesDTO): SourcesState {
  return dtos.map((dto) => mapFromDTOToSourcesItem(dto))
}

export function mapFromSourcesStateToDTOs(sources: SourcesState): SourceInputDTO[] {
  return sources.map((item) => mapFromSourcesItemToDTO(item))
}
