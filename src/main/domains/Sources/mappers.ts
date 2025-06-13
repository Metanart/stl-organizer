// /main/mappers/configMapper.ts
import { Source } from '@main/database/models/common/Source'

import { SourceDTO, SourceInputDTO, SourcesDTO } from '@shared/domains/Sources/types'

export function mapSourcesToDTO(sources: Source[]): SourcesDTO {
  return sources.map((source) => mapSourceToDTO(source))
}

export function mapSourceToDTO(source: Source): SourceDTO {
  return {
    id: source.id,
    path: source.path,
    isEnabled: source.isEnabled,
    comment: source.comment ?? null
  } satisfies SourceDTO
}

export function mapDTOToSource(dto: SourceInputDTO): Source {
  return {
    id: dto.id,
    path: dto.path,
    isEnabled: dto.isEnabled,
    comment: dto.comment ?? undefined
  } satisfies Partial<Source>
}

export function mapDTOsToSources(dtos: SourceDTO[]): Source[] {
  return dtos.map((dto) => mapDTOToSource(dto))
}
